import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
app.use(cors())
app.use(express.json())
// masif-sistem web sitesini servis et
app.use(express.static(path.join(__dirname, '../masif-sistem')))

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Leads klasörü oluştur
const leadsDir = path.join(__dirname, 'leads')
if (!fs.existsSync(leadsDir)) fs.mkdirSync(leadsDir)

// ──────────────────────────────────────────
// SYSTEM PROMPT
// ──────────────────────────────────────────
const SYSTEM_PROMPT = `Sen Masif.AI'sın — masif.klinik'in dijital danışmanı. Sağlık profesyonellerine kliniğin dijital büyüme çözümlerini tanıtıyorsun.

## KİMLİĞİN
İsim: Masif.AI | Rol: Klinik Dijital Danışman | Ton: sıcak, net, çözüm odaklı

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
- Konu dışı sorularda: 1 cümle + ["Ana Menü"] butonu`

// ──────────────────────────────────────────
// CHAT ENDPOINT
// ──────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array gerekli' })
    }

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages
    })

    const raw = response.content[0].text.trim()

    // JSON parse dene, başarısız olursa fallback
    let parsed
    try {
      // Bazen Claude markdown code block içinde döndürebilir
      const clean = raw.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()
      parsed = JSON.parse(clean)
    } catch {
      parsed = {
        text: raw,
        buttons: [],
        collectLead: false,
        leadReason: ''
      }
    }

    res.json(parsed)
  } catch (err) {
    console.error('Chat error:', err.message)
    res.status(500).json({ error: 'Sunucu hatası: ' + err.message })
  }
})

// ──────────────────────────────────────────
// LEAD KAYIT ENDPOINT
// ──────────────────────────────────────────
app.post('/api/lead', (req, res) => {
  try {
    const { name, email, phone, profession, reason, conversation } = req.body
    if (!email) return res.status(400).json({ error: 'E-posta zorunlu' })

    const lead = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      name: name || '',
      email,
      phone: phone || '',
      profession: profession || '',
      reason: reason || '',
      conversationLength: conversation?.length || 0
    }

    // leads/leads.json dosyasına ekle
    const leadsFile = path.join(leadsDir, 'leads.json')
    let existing = []
    if (fs.existsSync(leadsFile)) {
      try { existing = JSON.parse(fs.readFileSync(leadsFile, 'utf8')) } catch { existing = [] }
    }
    existing.push(lead)
    fs.writeFileSync(leadsFile, JSON.stringify(existing, null, 2), 'utf8')

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📥 YENİ LEAD:')
    console.log(`   İsim:    ${lead.name}`)
    console.log(`   E-posta: ${lead.email}`)
    console.log(`   Telefon: ${lead.phone}`)
    console.log(`   Meslek:  ${lead.profession}`)
    console.log(`   Talep:   ${lead.reason}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    res.json({ success: true })
  } catch (err) {
    console.error('Lead error:', err.message)
    res.status(500).json({ error: 'Lead kaydı başarısız' })
  }
})

// ──────────────────────────────────────────
// LEADS LİSTELEME (geliştirici için)
// ──────────────────────────────────────────
app.get('/api/leads', (req, res) => {
  const leadsFile = path.join(leadsDir, 'leads.json')
  if (!fs.existsSync(leadsFile)) return res.json([])
  try {
    const data = JSON.parse(fs.readFileSync(leadsFile, 'utf8'))
    res.json(data)
  } catch {
    res.json([])
  }
})

// ──────────────────────────────────────────
// SERVER
// ──────────────────────────────────────────
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`\n🚀 masif. klinik AI Asistanı çalışıyor`)
  console.log(`   → http://localhost:${PORT}\n`)
})
