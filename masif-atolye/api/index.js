const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

let anthropic;
try {
  anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || 'MISSING_API_KEY' });
} catch (e) {
  console.error("Anthropic Init Error:", e);
}

const leadsDir = '/tmp/leads';
if (!fs.existsSync(leadsDir)) {
  try { fs.mkdirSync(leadsDir, { recursive: true }) } catch {}
}

const SYSTEM_PROMPT = `Sen "masif. klinik" hizmetinin AI Danışman Asistanısın. Sağlık profesyonellerine kliniğin dijital büyüme çözümlerini tanıtıyorsun.

## KİMLİĞİN
İsim: masif. asistan | Rol: Klinik Dijital Danışman | Ton: sıcak, net, çözüm odaklı

## KONUŞMA AKIŞI (4 ADIM)

**ADIM 1 — Meslek Seçimi:**
Direkt meslek sorusuyla başla, selamlama kısa tut.
text: "Merhaba! Mesleğinizi seçin, size özel çözümleri gösterelim."
buttons: ["Diş Hekimi","Doktor","Diyetisyen","Fizyoterapist","Psikolog","Hastane Yöneticisi","Hemşire","Podolog","Diğer"]

**ADIM 2 — Otomasyon İhtiyacı:**
Meslek seçilince hangi otomasyonun daha uygun olduğunu sor.
text: "[Meslek] için en çok hangi alanda zaman harcıyorsunuz?"
buttons (mesleğe göre seç, max 5):
- Diş Hekimi/Doktor/Podolog: ["Randevu & Hasta Takibi","Sosyal Medya Yönetimi","Hasta Bilgilendirme","Denetim Hazırlığı","Web Sitesi & SEO"]
- Psikolog/Diyetisyen: ["Danışan Hatırlatmaları","Instagram DM Yönetimi","Hasta Bilgilendirme","Randevu Otomasyonu","Yönetmelik Uyumu"]
- Hastane Yöneticisi: ["Hasta İletişimi","Personel Koordinasyonu","Hasta Bilgilendirme","Web & Randevu Sistemi","Mevzuat Takibi"]
- Hemşire/Fizyoterapist: ["Randevu & Hatırlatma","Hasta Bilgilendirme","WhatsApp Otomasyonu","Diğer"]

**ADIM 3 — Çözüm Tanıtımı:**
Seçilen alana göre en uygun çözümü MAX 2 cümle tanıt.
Çözümler:
- Randevu/Hasta Takibi → WhatsApp AI: 7/24 otomatik randevu & hatırlatma, randevu iptallerini %60 azaltır.
- Sosyal Medya/Instagram → Instagram DM AI: Yönetmeliğe uygun otomatik yanıt, takipçiyi danışana dönüştürür.
- Hasta Bilgilendirme → QR Klinik Sistemi: Bekleme salonundaki hastalar QR kod ile hekim, cihaz ve işlem detaylarını anında telefonlarından okur.
- Denetim Hazırlığı → Öz Denetim PDF: Denetim öncesi tüm eksikleri tespit eden ücretsiz check-list.
- Web Sitesi/SEO → Web Sitesi: SEO odaklı, online randevu entegrasyonlu site, 3 haftada yayında.
- WhatsApp → WhatsApp AI: Mesai dışı mesajları otomatik yanıtlar, randevu oluşturur.
- Yönetmelik/Mevzuat → Yönetmelik Uyumu: Paylaşım öncesi otomatik kontrol, ceza riskini sıfırlar.
Sonunda: buttons: ["Ücretsiz Danışmanlık Al","Başka Konu","Yeniden Başla"]

**ADIM 4 — "Ücretsiz Danışmanlık Al" seçilince:**
collectLead: true, leadReason: "Ücretsiz Danışmanlık"
"Denetim Hazırlığı" konusunda: collectLead: true, leadReason: "Ücretsiz Öz Denetim Check-List PDF"

## ZORUNLU FORMAT
Her yanıtı YALNIZCA bu JSON ile ver, başka hiçbir şey yazma:
{"text":"mesaj","buttons":["btn1","btn2"],"collectLead":false,"leadReason":""}

## KURALLAR
- ADIM 1'de direkt meslek butonlarıyla başla (uzun karşılama yok)
- Cevaplar MAX 2 cümle
- "Yeniden Başla" seçilince ADIM 1'e dön
- Konu dışı sorularda: 1 cümle + ["Ana Menü"] butonu`;

function sendJson(res, status, data) {
  res.status(status).json(data);
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const urlPath = req.url.split('?')[0];

  if (urlPath === '/api/chat' || urlPath === '/chat') {
    if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method Not Allowed' });
    try {
      if (req.body && typeof req.body === 'string') {
        try { req.body = JSON.parse(req.body); } catch(e){}
      }
      const { messages } = req.body || {};
      if (!messages || !Array.isArray(messages)) {
        return sendJson(res, 400, { error: 'messages array gerekli' });
      }
      
      if (!process.env.ANTHROPIC_API_KEY) {
        return sendJson(res, 200, {
          text: "Sistemde API Anahtarı bulunamadı. Lütfen Vercel Cloud panelinden ANTHROPIC_API_KEY ekleyin.",
          buttons: [], collectLead: false, leadReason: ""
        });
      }

      const response = await anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages
      });

      const raw = response.content[0].text.trim();
      let parsed;
      try {
        const clean = raw.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
        parsed = JSON.parse(clean);
      } catch {
        parsed = { text: raw, buttons: [], collectLead: false, leadReason: '' };
      }

      return sendJson(res, 200, parsed);
    } catch (err) {
      console.error('Chat error:', err.message);
      return sendJson(res, 500, { error: 'Sunucu hatası: ' + err.message });
    }
  }

  if (urlPath === '/api/lead' || urlPath === '/lead') {
    if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method Not Allowed' });
    try {
      if (req.body && typeof req.body === 'string') {
        try { req.body = JSON.parse(req.body); } catch(e){}
      }
      const { name, email, phone, profession, reason, conversation } = req.body || {};
      if (!email) return sendJson(res, 400, { error: 'E-posta zorunlu' });

      const lead = {
        id: Date.now(), timestamp: new Date().toISOString(),
        name: name || '', email, phone: phone || '',
        profession: profession || '', reason: reason || '',
        conversationLength: conversation?.length || 0
      };

      const leadsFile = path.join(leadsDir, 'leads.json');
      let existing = [];
      if (fs.existsSync(leadsFile)) {
        try { existing = JSON.parse(fs.readFileSync(leadsFile, 'utf8')) } catch {}
      }
      existing.push(lead);
      fs.writeFileSync(leadsFile, JSON.stringify(existing, null, 2), 'utf8');
      return sendJson(res, 200, { success: true });
    } catch (err) {
      return sendJson(res, 500, { error: 'Lead kaydı başarısız' });
    }
  }

  if (urlPath === '/api/leads' || urlPath === '/leads') {
    if (req.method !== 'GET') return sendJson(res, 405, { error: 'Method Not Allowed' });
    const leadsFile = path.join(leadsDir, 'leads.json');
    if (!fs.existsSync(leadsFile)) return sendJson(res, 200, []);
    try {
      const data = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
      return sendJson(res, 200, data);
    } catch {
      return sendJson(res, 200, []);
    }
  }

  if (urlPath === '/api/ping' || urlPath === '/ping') {
    return sendJson(res, 200, { status: "OK", timestamp: Date.now(), key: process.env.ANTHROPIC_API_KEY ? "YES" : "NO" });
  }

  return sendJson(res, 404, { error: 'Endpoint bulunamadı 404', path: urlPath });
};
