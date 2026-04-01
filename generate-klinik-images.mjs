import { fal } from "@fal-ai/client";
import fs from "fs";
import https from "https";
import http from "http";
import path from "path";

fal.config({ credentials: "ad1165ef-64f5-4e9a-bef1-eb1ee7a8a015:61ad4ee762f9a931a9fa616c0cdc6618" });

const outputDir = "/Users/ozel/Hasan Claude/Çoklu Web site/masif-sistem/klinik-images";
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const IMAGES = [
  {
    filename: "whatsapp-ai-asistan.jpg",
    prompt: "A sleek modern smartphone floating in soft light showing a WhatsApp-style chat interface with AI response bubbles, medical clinic theme, clean white and sky blue color palette, minimalist flat lay on white marble surface, professional product photography, no text logos, soft shadows, ultra clean aesthetic, 8k quality"
  },
  {
    filename: "yonetmelik-uyumluluk.jpg",
    prompt: "Abstract visualization of legal compliance and digital shield protection, blue glowing digital checkmarks and legal documents floating in clean white space, medical regulation concept, geometric shapes with soft gradients, modern minimal tech illustration style, sky blue and white color palette, professional corporate photography, 8k quality"
  },
  {
    filename: "ai-icerik-uretimi.jpg",
    prompt: "Creative AI content generation concept, glowing neural network nodes forming social media post layouts on a clean white background, content calendars and post previews floating in space, sky blue and cyan color accents, modern flat design meets photography, minimal tech aesthetic, professional studio lighting, 8k quality"
  },
  {
    filename: "web-sitesi-kurulumu.jpg",
    prompt: "Modern medical clinic website displayed on sleek devices, laptop and phone mockup on white marble desk, clean professional healthcare web design visible on screens, minimal Scandinavian interior background, soft natural lighting, sky blue accent colors, professional product photography, 8k quality"
  },
  {
    filename: "klinik-ici-bilgilendirme.jpg",
    prompt: "A patient scanning a QR code with a smartphone in a modern bright clinic waiting room, clean white interior with subtle medical design elements, soft natural light through large windows, minimal and professional atmosphere, doctor information page visible on phone screen, sky blue color accents, editorial photography style, 8k quality"
  },
  {
    filename: "sosyal-medya-icerik.jpg",
    prompt: "Social media content creation for healthcare, floating phone screens showing professional medical posts and reels, AI-powered content creation visualization, clean white background with sky blue gradient accents, content calendar and analytics dashboard elements, modern minimal tech aesthetic, soft studio lighting, 8k quality"
  },
  {
    filename: "klinik-web-sitesi.jpg",
    prompt: "Premium medical clinic website on a large iMac-style monitor in a modern bright office, clean professional healthcare design with appointment booking interface visible, white marble desk with subtle clinic decor, soft warm natural lighting, sky blue and white color theme, editorial photography style, 8k quality"
  },
  {
    filename: "hasta-bilgilendirme-sistemi.jpg",
    prompt: "Digital patient information system in a modern clinic, floating holographic tablets showing doctor profiles and treatment information, clean bright medical interior, patients interacting with digital displays, sky blue glowing interface elements, minimal futuristic healthcare concept, soft professional lighting, 8k quality"
  },
  {
    filename: "hasta-takip-hatirlatma.jpg",
    prompt: "Healthcare patient follow-up automation concept, phone notifications and calendar reminders floating above a clean white background, medical appointment booking and reminder system visualization, sky blue and white color palette, modern minimal tech aesthetic, clock and notification bell icons, soft studio lighting, professional photography, 8k quality"
  },
  {
    filename: "danisan-iletisim-asistan.jpg",
    prompt: "Psychology practice digital communication assistant concept, calm and serene visual with soft purple and sky blue gradients, chat interface and calendar floating in peaceful space, mental health professional consultation atmosphere, minimal clean aesthetic, soft diffused lighting, zen-like composition, professional editorial photography, 8k quality"
  },
  {
    filename: "danisan-takip-motivasyon.jpg",
    prompt: "Nutrition and diet coaching digital tracking system, health data charts and motivational messages on phone screens, colorful healthy food elements on white background, orange and sky blue accent colors, progress tracking visualization, modern wellness app aesthetic, bright studio product photography, 8k quality"
  },
  {
    filename: "kurumsal-dijital-donusum.jpg",
    prompt: "Hospital corporate digital transformation concept, aerial view of interconnected digital nodes forming a hospital building silhouette, multiple departments connected by glowing data streams, deep navy blue and sky blue color palette, modern tech meets healthcare visualization, clean minimal aesthetic, professional editorial photography, 8k quality"
  },
];

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const protocol = url.startsWith("https") ? https : http;
    protocol.get(url, (response) => {
      response.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function generateImage(item, index) {
  console.log(`\n[${index + 1}/${IMAGES.length}] Üretiliyor: ${item.filename}`);
  
  try {
    const result = await fal.subscribe("fal-ai/flux-pro/v1.1-ultra", {
      input: {
        prompt: item.prompt,
        image_size: "landscape_16_9",
        num_images: 1,
        output_format: "jpeg",
        safety_tolerance: "2",
      },
      logs: false,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          process.stdout.write(".");
        }
      },
    });

    const imageUrl = result.data.images[0].url;
    const outputPath = path.join(outputDir, item.filename);
    await downloadImage(imageUrl, outputPath);
    console.log(`\n  ✅ Kaydedildi: ${item.filename}`);
    return outputPath;
  } catch (err) {
    console.error(`\n  ❌ Hata (${item.filename}):`, err.message || err);
    return null;
  }
}

console.log("🏥 Masif.Klinik görselleri üretiliyor...");
console.log(`📁 Çıktı: ${outputDir}`);
console.log(`🖼️  Toplam: ${IMAGES.length} görsel\n`);

// Sırayla üret (rate limit aşmamak için)
for (let i = 0; i < IMAGES.length; i++) {
  await generateImage(IMAGES[i], i);
  if (i < IMAGES.length - 1) {
    console.log("  ⏳ 2s bekleniyor...");
    await new Promise(r => setTimeout(r, 2000));
  }
}

console.log("\n\n✅ Tüm görseller tamamlandı!");
console.log(`📁 Klasör: ${outputDir}`);
