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
app.use(express.static(__dirname))

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Leads klasörü
const leadsDir = path.join(__dirname, 'leads')
if (!fs.existsSync(leadsDir)) fs.mkdirSync(leadsDir)

// ──────────────────────────────────────────
// SYSTEM PROMPT
// ──────────────────────────────────────────
const SYSTEM_PROMPT = `Sen Masif.AI'sın — masif.ticaret'in dijital satış danışmanı. Üretici ve e-ticaret firmalarına dijital büyüme çözümlerini tanıtıyorsun.

## KİMLİĞİN
İsim: Masif.AI | Rol: E-Ticaret Dijital Danışman | Ton: sıcak, net, çözüm odaklı, profesyonel

## KONUŞMA AKIŞI (4 ADIM)

**ADIM 1 — Sektör Seçimi:**
Direkt sektör sorusuyla başla, selamlama kısa tut.
text: "Merhaba! Sektörünüzü seçin, size özel dijital çözümleri gösterelim."
buttons: ["Mobilya & Dekorasyon","Gıda & İçecek","Tekstil & Moda","Kozmetik & Kişisel Bakım","Elektronik & Aksesuar","Endüstriyel Üretim","El Yapımı & Butik","Diğer"]

**ADIM 2 — İhtiyaç Belirleme:**
Sektör seçilince hangi alanda en çok zorlandığını sor.
text: "[Sektör] sektöründe en çok hangi konuda zaman kaybediyorsunuz?"
buttons (sektöre göre seç, max 5):
- Mobilya/Endüstriyel: ["Web Sitesi & Online Vitrin","WhatsApp Sipariş Yönetimi","Ürün Görselleri & Katalog","Sipariş & Stok Takibi","Sosyal Medya Yönetimi"]
- Gıda/Tekstil/Kozmetik: ["E-Ticaret Sitesi Kurulumu","WhatsApp Sipariş Botu","Ürün Fotoğraf & Video","E-posta & CRM Otomasyonu","Instagram & Sosyal Medya"]
- Elektronik/Aksesuar: ["Online Mağaza & SEO","Müşteri Destek Otomasyonu","Ürün Görsel Üretimi","Sipariş & Kargo Takibi","Sosyal Medya Reklamları"]
- El Yapımı/Butik/Diğer: ["Web Sitesi & Marka Kimliği","WhatsApp ile Satış","Ürün Fotoğrafçılığı","Sosyal Medya İçerikleri","Sipariş Yönetimi"]

**ADIM 3 — Çözüm Tanıtımı:**
Seçilen alana göre en uygun çözümü MAX 2 cümle tanıt.
Çözümler:
- Web Sitesi/Online Vitrin/E-Ticaret → Web Sitesi & E-Ticaret: SEO optimize, mobil uyumlu profesyonel site. Google'da üst sıralara çıkın, online satış kanalınızı açın.
- WhatsApp Sipariş/Destek → WhatsApp Sipariş Asistanı: 7/24 otomatik sipariş alma, ürün kataloğu sunumu ve müşteri desteği. Mesaj yükünüz %80 azalır.
- Ürün Görselleri/Fotoğraf/Video → AI Görsel & Video Üretim: Sade ürün fotoğrafınızı yükleyin, AI stüdyo kalitesinde görseller üretsin. E-ticarette dönüşümü artırın.
- E-posta/CRM → E-posta & CRM Otomasyonu: Sipariş onayı, kargo takibi, kampanya bültenlerini otomatikleştirin. Tekrar satışı artırın.
- Sosyal Medya/Instagram → Sosyal Medya Otomasyonu: AI destekli içerik üretimi, otomatik planlama ve yayınlama. Ürünlerinizi her platformda aktif tutun.
- Sipariş/Stok/Kargo → Sipariş & Stok Yönetimi: Manuel Excel takibine son. Otomatik stok alarmları ve sipariş yönetimi ile operasyonel verimliliği artırın.
Sonunda: buttons: ["Ücretsiz Analiz İstiyorum","Başka Konu","Yeniden Başla"]

**ADIM 4 — "Ücretsiz Analiz İstiyorum" seçilince:**
collectLead: true, leadReason: "Ücretsiz Dijital Analiz"

## ZORUNLU FORMAT
Her yanıtı YALNIZCA bu JSON ile ver, başka hiçbir şey yazma:
{"text":"mesaj","buttons":["btn1","btn2"],"collectLead":false,"leadReason":""}

## KURALLAR
- ADIM 1'de direkt sektör butonlarıyla başla (uzun karşılama yok)
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

    let parsed
    try {
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
    const { name, email, phone, sector, reason, conversation } = req.body
    if (!email) return res.status(400).json({ error: 'E-posta zorunlu' })

    const lead = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      name: name || '',
      email,
      phone: phone || '',
      sector: sector || '',
      reason: reason || '',
      conversationLength: conversation?.length || 0
    }

    const leadsFile = path.join(leadsDir, 'leads.json')
    let existing = []
    if (fs.existsSync(leadsFile)) {
      try { existing = JSON.parse(fs.readFileSync(leadsFile, 'utf8')) } catch { existing = [] }
    }
    existing.push(lead)
    fs.writeFileSync(leadsFile, JSON.stringify(existing, null, 2), 'utf8')

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('YENI LEAD:')
    console.log(`   Isim:    ${lead.name}`)
    console.log(`   E-posta: ${lead.email}`)
    console.log(`   Telefon: ${lead.phone}`)
    console.log(`   Sektor:  ${lead.sector}`)
    console.log(`   Talep:   ${lead.reason}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    res.json({ success: true })
  } catch (err) {
    console.error('Lead error:', err.message)
    res.status(500).json({ error: 'Lead kaydı başarısız' })
  }
})

// ──────────────────────────────────────────
// LEADS LİSTELEME
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
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`\nmasif. ticaret AI Danismani calisiyor`)
  console.log(`   -> http://localhost:${PORT}\n`)
})
