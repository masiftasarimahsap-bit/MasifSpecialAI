"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const SECTOR_COLORS: Record<string, string> = {
  "🏥 Genel Sağlık": "#dc2626",
  "🏥 Özel Hastaneler": "#1e3a5f",
  "🦷 Diş Hekimleri": "#00D4AA",
  "👨‍⚕️ Doktorlar": "#16a34a",
  "🥗 Diyetisyenler": "#FF6B35",
  "🧠 Psikologlar": "#7c3aed",
  "🦶 Podologlar": "#ec4899",
  "👩‍⚕️ Hemşireler": "#0ea5e9",
};

const CASES = [
  {
    badge: "🏥 Genel Sağlık",
    title: "WhatsApp AI Asistanı",
    image: "/masif-sistem/klinik-images/whatsapp-ai-asistan.jpg",
    problem: "Bir diş kliniğine günde ortalama 40-60 WhatsApp mesajı geliyor. Hekim koltukta çalışırken mesajlara dönemiyor. Geç yanıt verilen her mesaj, başka bir kliniğe giden bir hasta demek. Mesai saatleri dışında gelen mesajlar ise tamamen cevapsız kalıyor.",
    steps: [
      "Hasta WhatsApp'tan kliniğe yazıyor → AI asistanı saniyeler içinde profesyonel yanıt veriyor",
      "Randevu talebi gelirse → uygun saatleri sunar, hekim/sekreter onayına yönlendirir",
      "Tedavi sorusu gelirse → yönetmeliğe uygun şekilde genel bilgilendirme yapar (fiyat vermez, garanti vermez)",
      "Acil durum tespit edilirse → doğrudan hekime yönlendirir, bildirim gönderir",
      "Mesai dışı mesajlar → otomatik karşılama + randevu talebi kayıt altına alınır",
    ],
    result: "Hasta kaybı minimuma indi. 7/24 profesyonel iletişim sağlandı. Hekimin mesaj yükü %90 azaldı.",
    tools: ["WhatsApp Business API", "Claude AI", "Make.com", "Google Sheets"],
  },
  {
    badge: "🏥 Genel Sağlık",
    title: "Yönetmelik Uyumluluk Kontrolü",
    image: "/masif-sistem/klinik-images/yonetmelik-uyumluluk.jpg",
    problem: "Sağlık Hizmetlerinde Tanıtım ve Bilgilendirme Faaliyetleri Hakkında Yönetmelik kapsamında cezalar ciddi oranda arttı. Hekimler sosyal medya paylaşımı yapmaktan çekiniyor çünkü neyin yasak neyin serbest olduğunu bilmiyorlar. Bir paylaşımdaki tek bir yanlış ifade binlerce lira cezaya yol açabiliyor.",
    steps: [
      "Hekim paylaşım taslağını (görsel + metin) sisteme yükler",
      "AI, yönetmelikteki tüm kısıtlamaları kontrol eder (önce/sonra yasağı, fiyat bilgisi, garanti ifadeleri, yanıltıcı beyanlar)",
      "Görsel analiz yapılır (önce/sonra görseli var mı, logo uygun mu, yasak içerik var mı)",
      "Uygunsa → onay verilir, isteğe bağlı olarak otomatik yayınlanır",
      "Uygun değilse → sorunlu noktalar ve düzeltme önerileri detaylı olarak sunulur",
    ],
    result: "Ceza riski sıfıra indi. Hekim güvenle paylaşım yapmaya başladı. Sosyal medya trafiği ve hasta kazanımı arttı.",
    tools: ["Claude AI", "Vision API", "Make.com", "Airtable"],
  },
  {
    badge: "🏥 Genel Sağlık",
    title: "Sosyal Medya İçerik Üretimi",
    image: "/masif-sistem/klinik-images/sosyal-medya-icerik.jpg",
    problem: "Sağlık profesyonelleri yoğun iş temposu içinde sosyal medya içeriği üretmeye vakit bulamıyor. Ajansa verdiğinde ise ajans sağlık yönetmeliğini bilmediği için riskli içerikler çıkıyor. Sonuç: ya hiç paylaşım yok ya da ceza riski taşıyan paylaşımlar.",
    steps: [
      "Kliniğin uzmanlık alanları ve hizmetleri sisteme tanımlanır",
      "AI görsel ve video oluşturma ajanları ile profesyonel içerikler üretilir (eğitici postlar, bilgilendirici reels, klinik tanıtım görselleri)",
      "İstenirse AI destekli UGC tarzı videolarla kliniğinizin tanıtımı yapılır",
      "Aylık içerik takvimi oluşturulur, onaylanan içerikler planlanıp otomatik yayınlanır",
      "Tüm içeriklerin yönetmeliğe uygunluğu sektör deneyimine sahip ekibimiz tarafından kontrol edilir",
      "Performans verileri haftalık rapor olarak sunulur",
    ],
    result: "İçerik üretimi için harcanan süre sıfıra indi. Ayda 12-16 yönetmeliğe uyumlu, profesyonel görsel ve video paylaşımı yapılıyor.",
    tools: ["Claude AI", "DALL-E", "Runway ML", "Canva API", "Meta API", "Make.com"],
  },
  {
    badge: "🏥 Genel Sağlık",
    title: "Profesyonel Klinik Web Sitesi",
    image: "/masif-sistem/klinik-images/klinik-web-sitesi.jpg",
    problem: "Hastaların büyük çoğunluğu bir klinik veya sağlık profesyonelini tercih etmeden önce internette araştırıyor. Web sitesi olmayan veya güncel olmayan bir site, hastaların güvenini kazanamıyor. Ayrıca yönetmeliğe aykırı ifadeler içeren web siteleri de ceza riski taşıyor.",
    steps: [
      "Kliniğin bilgileri, hizmetleri ve hekim profilleri toplanır",
      "AI destekli içerik yazımı yapılır (yönetmeliğe uygun, SEO optimize)",
      "Modern, mobil uyumlu web sitesi tasarlanır ve kurulur",
      "Google Business profili entegre edilir",
      "Online randevu formu ve WhatsApp CTA eklenir",
      "Düzenli içerik güncellemesi planı oluşturulur",
    ],
    result: "Dijitalde görünür olmayan klinik, Google aramalarında üst sıralara çıktı. Online randevu talepleri başladı.",
    tools: ["Next.js", "Vercel", "Google Business", "WhatsApp API", "Claude AI"],
  },
  {
    badge: "🏥 Genel Sağlık",
    title: "Klinik İçi Hasta Bilgilendirme Sistemi",
    image: "/masif-sistem/klinik-images/hasta-bilgilendirme-sistemi.jpg",
    problem: "Yönetmelik sosyal medyada birçok şeyi kısıtlıyor, ancak klinik içinde yapılan bilgilendirme farklı değerlendiriliyor. Sağlık profesyonelleri bu avantajı kullanamıyor. Hastalar kliniğe geldiğinde hekimler ve tedaviler hakkında yeterli bilgiye ulaşamıyor. Basılı broşürler güncel tutulması zor ve maliyetli.",
    steps: [
      "Kliniğin hekimleri, tedavileri ve hizmetleri sisteme girilir",
      "QR kod bazlı dijital bilgilendirme sayfaları oluşturulur",
      "Hasta klinikte QR kodu telefonuyla okutarak bilgilere erişir",
      "Hekim profilleri, tedavi detayları, sık sorulan sorular ve bakım bilgileri görüntülenir",
      "İçerikler anlık olarak güncellenebilir, basım maliyeti sıfır",
    ],
    result: "Hastalar tedavi öncesi detaylı bilgi aldı, güven arttı. Yönetmelik sınırlarının dışında geniş kapsamlı tanıtım yapılabilir hale geldi.",
    tools: ["Next.js", "QR Code API", "Claude AI", "Vercel"],
  },
  {
    badge: "🏥 Genel Sağlık",
    title: "Hasta Takip & Hatırlatma Otomasyonu",
    image: "/masif-sistem/klinik-images/hasta-takip-hatirlatma.jpg",
    problem: "Tedavi sonrası hastaların veya danışanların kontrol randevularını unutması, bakım talimatlarına uymaması ve geri dönmemesi yaygın bir sorun. Manuel olarak tek tek arama veya mesaj göndermek ise büyük zaman kaybı.",
    steps: [
      "Tedavi tamamlandığında hasta bilgileri sisteme otomatik kaydedilir",
      "24 saat sonra → bakım talimatları ve dikkat edilecekler WhatsApp'tan gönderilir",
      "1 hafta sonra → durum sorgulama mesajı gönderilir",
      "Kontrol zamanı yaklaştığında → otomatik randevu hatırlatması yapılır",
      "Hasta memnuniyet anketi → tedavi deneyimi hakkında geri bildirim toplanır",
    ],
    result: "Kontrol randevusu kaçırma oranı %60 azaldı. Hasta memnuniyeti ve kliniğe bağlılık arttı.",
    tools: ["WhatsApp Business API", "Make.com", "Google Sheets", "Claude AI"],
  },
  {
    badge: "🧠 Psikologlar",
    title: "Danışan İletişim Asistanı",
    image: "/masif-sistem/klinik-images/danisan-iletisim-asistan.jpg",
    problem: "Bir psikolog danışanlarıyla iletişimde özel hassasiyetler taşımak zorunda. Seans saatleri dışında gelen mesajlara anında dönmek mümkün değil. Danışanlar seans zamanlarını unutuyor, randevu iptalleri son dakikada geliyor.",
    steps: [
      "Danışan WhatsApp'tan yazıyor → gizlilik odaklı, sınırlı ama profesyonel yanıt verilir (klinik bilgi paylaşılmaz)",
      "Randevu talebi gelirse → müsait saatler sunulur, onay alınır",
      "Seans 24 saat öncesinde → otomatik hatırlatma gönderilir",
      "İptal gelirse → alternatif saat önerisi sunulur, bekleme listesindeki danışana bilgi gider",
      "Sosyal medya içerikleri → psikoloji alanına uygun, yönetmeliğe uyumlu şekilde üretilir",
    ],
    result: "Son dakika iptallerinde %40 azalma. Danışan iletişimi profesyonelleşti. Psikolog mesaj yükünden kurtuldu.",
    tools: ["WhatsApp Business API", "Claude AI", "Google Calendar", "Make.com"],
  },
  {
    badge: "🥗 Diyetisyenler",
    title: "Danışan Takip & Motivasyon Sistemi",
    image: "/masif-sistem/klinik-images/danisan-takip-motivasyon.jpg",
    problem: "Bir diyetisyen her hafta düzinelerce danışanla ilgileniyor. Diyet programına uyumu takip etmek, motivasyon mesajları göndermek ve kontrol randevularını hatırlatmak büyük zaman alıyor. Danışanlar ilk haftalardan sonra motivasyonlarını kaybedip programdan kopabiliyor.",
    steps: [
      "Danışan programa başladığında bilgileri sisteme kaydedilir",
      "Her gün belirlenen saatte → motivasyon mesajı veya beslenme ipucu gönderilir",
      "Haftalık kontrol öncesinde → hatırlatma + kilo/ölçü kayıt formu gönderilir",
      "Danışan WhatsApp'tan soru sorduğunda → AI genel beslenme bilgilendirmesi yapar",
      "Aylık ilerleme raporu → otomatik oluşturulup danışana ve diyetisyene gönderilir",
    ],
    result: "Program terk oranı %50 azaldı. Diyetisyenin günlük takip mesajları için harcadığı süre sıfıra indi.",
    tools: ["WhatsApp Business API", "Claude AI", "Google Sheets", "Make.com"],
  },
  {
    badge: "🏥 Özel Hastaneler",
    title: "Kurumsal Dijital Dönüşüm Paketi",
    image: "/masif-sistem/klinik-images/kurumsal-dijital-donusum.jpg",
    problem: "Bir özel hastanenin onlarca hekimi, birden fazla bölümü ve yüksek hacimli hasta iletişimi var. Her bölüm ayrı sosyal medya yönetiyor, tutarsız mesajlar çıkıyor. Yönetmelik uyumluluğu her bölüm için ayrı takip edilmek zorunda.",
    steps: [
      "Tüm bölümler için merkezi WhatsApp AI asistanı kurulur → hasta doğru bölüme yönlendirilir",
      "Her hekimin sosyal medya içeriği merkezi sistemden yönetilir, hepsi yönetmelik kontrolünden geçer",
      "Hastane web sitesi optimize edilir (SEO + yönetmelik uyumu + online randevu)",
      "Google yorumları tüm bölümler için merkezi olarak takip edilir ve yanıtlanır",
      "Aylık dijital performans raporu yönetime sunulur (bölüm bazlı)",
    ],
    result: "Hasta iletişimi %70 hızlandı. Tüm bölümlerde yönetmeliğe %100 uyum sağlandı. Dijital kanallardan hasta kazanımı arttı.",
    tools: ["WhatsApp Business API", "Claude AI", "Make.com", "Meta API", "Google Business", "Airtable"],
  },
];

function SectorBadge({ badge }: { badge: string }) {
  const color = SECTOR_COLORS[badge] ?? "#0ea5e9";
  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ color, background: `${color}14`, border: `1px solid ${color}30` }}
    >
      {badge}
    </span>
  );
}

function CaseCard({ c, i }: { c: (typeof CASES)[0]; i: number }) {
  const color = SECTOR_COLORS[c.badge] ?? "#0ea5e9";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.4, delay: i * 0.06 }}
      className="bg-white rounded-2xl border border-[rgba(14,165,233,0.12)] shadow-sm hover:shadow-md hover:border-[rgba(14,165,233,0.3)] transition-all duration-300 flex flex-col overflow-hidden"
    >
      <div className="relative w-full h-44 overflow-hidden">
        <Image src={c.image} alt={c.title} fill className="object-cover" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="px-6 pt-4 pb-3 border-b border-[rgba(14,165,233,0.08)]">
        <div className="flex items-center gap-3 mb-2">
          <SectorBadge badge={c.badge} />
        </div>
        <h3 className="text-base font-bold text-[#0f172a]">{c.title}</h3>
      </div>
      <div className="px-6 py-4 flex-1 space-y-4">
        <div>
          <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider mb-1.5">Problem</p>
          <p className="text-sm text-[#475569] leading-relaxed">{c.problem}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider mb-2">Otomasyon Akışı</p>
          <ul className="space-y-1.5">
            {c.steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#475569]">
                <span
                  className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white mt-0.5"
                  style={{ background: color }}
                >
                  {idx + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl p-3" style={{ background: `${color}08`, border: `1px solid ${color}20` }}>
          <p className="text-xs font-semibold mb-0.5" style={{ color }}>Sonuç</p>
          <p className="text-sm font-medium text-[#0f172a]">{c.result}</p>
        </div>
      </div>
      <div className="px-6 pb-5 flex flex-wrap gap-1.5">
        {c.tools.map((tool) => (
          <span key={tool} className="text-xs text-[#64748b] bg-[#f1f5f9] border border-[rgba(14,165,233,0.1)] px-2 py-0.5 rounded">
            {tool}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

const SEKTORLER = ["Özel Hastaneler", "Diş Hekimleri", "Doktorlar", "Diyetisyenler", "Psikologlar", "Podologlar", "Hemşireler"];

export default function CaseStudies() {
  return (
    <section id="senaryolar" className="py-24 px-6 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-[#7c3aed] uppercase tracking-widest mb-3 font-medium">Çözüm Senaryoları</p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a]">
            Sektörünüze Özel{" "}
            <span className="gradient-text">Dijital Çözümler</span>
          </h2>
          <p className="mt-4 text-[#64748b] max-w-xl mx-auto">
            Sağlık profesyonellerinin günlük karşılaştığı sorunlara gerçek, yönetmeliğe uyumlu çözümler.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 justify-center">
            <span className="text-xs text-[#94a3b8] font-medium uppercase tracking-wider">Kimler için çalışıyoruz?</span>
            {SEKTORLER.map((s, i) => (
              <span key={s} className="text-xs text-[#475569]">{s}{i < SEKTORLER.length - 1 ? " ·" : ""}</span>
            ))}
          </div>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASES.map((c, i) => (
            <CaseCard key={c.title} c={c} i={i} />
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-xs text-[#94a3b8] mt-8"
        >
          * Bu senaryolar demo projelerdir.
        </motion.p>
      </div>
    </section>
  );
}
