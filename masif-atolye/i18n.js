// ===== i18n - Language Switching =====
(function() {
  'use strict';

  var translations = {
    tr: {
      nav_home: "Ana Sayfa",
      nav_products: "Ürünler",
      nav_about: "Hakkımızda",
      nav_stores: "Mağazalar",
      nav_contact: "İletişim",
      hero_badge: "masif special",
      hero_title: "Ahşabın Zamana<br/>Bıraktığı <em>İz</em>",
      hero_desc: "Atölyemizde her parça tek tek elde şekillenir. Ceviz, meşe ve iroko; ustanın elinde yaşam alanlarınıza karakter katan birer esere dönüşür.",
      hero_cta: "Koleksiyonu Keşfet",
      hero_scroll: "Keşfet",
      products_label: "Koleksiyonumuz",
      products_title: "El Yapımı Masif Ahşap Ürün <em>Koleksiyonumuz</em>",
      products_desc: "Doğal kayın ağacından, tek tek el işçiliğiyle üretilen premium ürünlerimizi keşfedin.",
      view_collection: "Koleksiyonu Gör →",
      cat_desk_clock: "Masaüstü Ahşap Saatler",
      cat_desk_clock_desc: "Doğal kayın ağacından, kemerli tasarım. 3 kadran modeli, sessiz mekanizma, kişiselleştirilebilir arka yüz.",
      cat_wall_clock: "Duvar Saatleri",
      cat_wall_clock_desc: "30cm ve 40cm boyutlarda, doğal kayın ağacından duvar saatleri. İsim, tarih veya logo kazıma seçeneği.",
      cat_candleholders: "Ahşap Şamdanlar",
      cat_candleholders_desc: "Torna tekniğiyle üretilen 5 farklı model. Tekli veya 3'lü set seçenekleri.",
      cat_vases: "Ahşap Dekoratif Vazolar",
      cat_vases_desc: "Kayın ve ceviz ağacından, damla ve şişe formlarında dekoratif vazolar.",
      cat_legs: "Mobilya Ayakları",
      cat_legs_desc: "Tornalanmış masif kayın ağacı mobilya ayakları. Klasik tornalı ve modern konik modeller.",
      cat_shelf: "Duvar Rafları",
      cat_shelf_desc: "Oval kemerli doğal ahşap duvar rafları. Açık ve koyu ton seçenekleri.",
      about_label: "Hikayemiz",
      about_title: "Masif Ahşap El İşçiliği <em>Hikayemiz</em>",
      about_p1: "masif. olarak her ürünümüzde doğanın benzersiz güzelliğini koruyarak, masif ahşabı modern tasarım anlayışıyla buluşturuyoruz. Her bir parça, deneyimli zanaatkârlarımız tarafından titizlikle şekillendirilir.",
      about_p2: "Ceviz, meşe, iroko ve kayın gibi seçkin ağaç türlerinden ürettiğimiz ürünlerimiz, doğal dokusu ve sıcaklığıyla yaşam alanlarınıza karakter katıyor. Kaliteden ödün vermeden, sürdürülebilir üretim anlayışıyla çalışıyoruz.",
      stores_label: "Mağazalar",
      stores_title: "Online Ahşap Ürün <em>Mağazalarımız</em>",
      stores_visit: "Mağazayı Ziyaret Et",
      contact_label: "İletişim",
      contact_title: "Bizimle İletişime <em>Geçin</em>",
      contact_desc: "Özel sipariş, toplu alım veya herhangi bir soru için bizimle iletişime geçebilirsiniz.",
      contact_name: "Adınız",
      contact_email: "E-posta Adresiniz",
      contact_message: "Mesajınız",
      contact_submit: "Mesaj Gönder",
      contact_phone_label: "Telefon",
      contact_email_label: "E-posta",
      contact_location_label: "Konum",
      contact_whatsapp: "WhatsApp'tan Yazın",
      footer_products: "Ürünler",
      footer_links: "Bağlantılar",
      footer_stores: "Mağazalar",
      footer_copyright: "© 2025 masif. Tüm hakları saklıdır.",
      footer_privacy: "Gizlilik Politikası",
      footer_terms: "Kullanım Koşulları",
      whatsapp_tooltip: "WhatsApp ile yazın",
      cat_featured: "Öne Çıkan",
      cat_label_clocks: "Saatler",
      cat_label_deco: "Dekorasyon",
      cat_label_furniture: "Mobilya",
      cat_deco_products: "Dekoratif Ürünler",
      card_desk_clock_desc: "Doğal masif ahşaptan el işçiliğiyle üretilen masaüstü saatler.",
      card_wall_clock_desc: "Yaşam alanlarınıza doğallık ve zarafet katan modeller.",
      card_candleholders_desc: "El yapımı ahşap şamdan setleri ve vazolar.",
      card_legs_desc: "Çeşitli tasarımlarda, özenle tornalanan masif ahşap mobilya ayakları.",
      card_deco_desc: "Yaşam alanlarınıza doğallık ve sıcaklık katan el yapımı dekoratif masif objeler, tabelalar ve raflar.",
      showcase_desk_badge: "Masaüstü Saatler",
      showcase_desk_title: "Masaüstü Saat Koleksiyonu",
      showcase_desk_subtitle: "Çalışma masanızdan komodininize, yaşam alanlarınıza karakter katan el yapımı masaüstü saatler.",
      showcase_vase_badge: "Vazo & Şamdan",
      showcase_vase_title: "Vazo & Şamdan Koleksiyonu",
      showcase_vase_subtitle: "Evinizin havasını değiştiren, masif ahşabın sıcaklığını mum ışığıyla birleştiren el işçiliği tasarımlar.",
      showcase_vase_link1: "Vazo Koleksiyonu →",
      showcase_vase_link2: "Şamdan Koleksiyonu →",
      showcase_deco_badge: "Dekorasyon",
      showcase_deco_title: "Dekoratif Ürün Koleksiyonu",
      showcase_deco_subtitle: "Duvarlarınızı süsleyen masif tabelalar ve minimalist raflar ile yaşam alanlarınıza masif dokunuşlar.",
      showcase_wall_badge: "Duvar Saatleri",
      showcase_wall_title: "Ahşap Duvar Saati Koleksiyonu",
      showcase_wall_subtitle: "Masif ahşabın doğal dokusunu duvarlarınıza taşıyan, her biri el işçiliğiyle üretilen eşsiz tasarımlar.",
      about_stat_designs: "Tasarım",
      about_stat_craft: "El İşçiliği",
      about_stat_wood: "Doğal Ahşap",
      stores_badge: "Online Mağazalar",
      stores_subtitle: "Ürünlerimizi incelemek ve sipariş vermek için online mağazalarımızı ziyaret edin.",
      store_shopier_name: "Shopier Mağaza",
      store_shopier_desc: "Tüm ürün koleksiyonumuzu Shopier üzerinden güvenle satın alabilirsiniz.",
      store_etsy_main_desc: "Saatler, şamdanlar ve dekoratif ahşap ürünlerin yer aldığı ana mağazamız.",
      store_etsy_vibe_desc: "Özel tasarım ve yaratıcı ahşap ürünlerimizin sergilendiği butik mağaza.",
      store_hepsiburada_desc: "Türkiye'nin en büyük e-ticaret platformunda masif ahşap ürünlerimizi keşfedin.",
      store_etsy_legs_desc: "Çeşitli model ve boyutlarda ahşap mobilya ayaklarına özel mağazamız.",
      contact_subject: "Konu",
      footer_brand_desc: "Doğal masif ahşaptan, el işçiliğiyle üretilen premium tasarım ürünleri. Her parça eşsiz bir hikaye taşır.",
      footer_quick_links: "Hızlı Linkler",
      footer_desk_clock: "Masa Saatleri",
      footer_wall_clock: "Duvar Saatleri",
      footer_candleholders_link: "Şamdanlar",
      footer_vases: "Vazolar",
      footer_legs_link: "Mobilya Ayakları",
      footer_shelf_link: "Duvar Rafları",
      footer_secure_payment: "Güvenli Ödeme",
      footer_delivery: "Teslimat & İade",
      footer_copyright_current: "© 2026 masif. Tüm hakları saklıdır."
    },
    en: {
      nav_home: "Home",
      nav_products: "Products",
      nav_about: "About Us",
      nav_stores: "Stores",
      nav_contact: "Contact",
      hero_badge: "masif special",
      hero_title: "Where Wood<br/>Meets <em>Time</em>",
      hero_desc: "Every piece is shaped by hand in our workshop. Walnut, oak and iroko become works of quiet character in the maker's hands.",
      hero_cta: "Explore Collection",
      hero_scroll: "Discover",
      products_label: "Our Collection",
      products_title: "Handcrafted Solid Wood Product <em>Collection</em>",
      products_desc: "Discover our premium products, each handcrafted one by one from natural beech wood.",
      view_collection: "View Collection →",
      cat_desk_clock: "Wooden Desk Clocks",
      cat_desk_clock_desc: "Natural beech wood, arched design. 3 dial models, silent mechanism, customizable back.",
      cat_wall_clock: "Wall Clocks",
      cat_wall_clock_desc: "30cm and 40cm sizes, natural beech wood wall clocks. Name, date, or logo engraving options.",
      cat_candleholders: "Wooden Candleholders",
      cat_candleholders_desc: "5 different models produced with lathe technique. Single or 3-piece set options.",
      cat_vases: "Decorative Wooden Vases",
      cat_vases_desc: "Beech and walnut wood, decorative vases in drop and bottle forms.",
      cat_legs: "Furniture Legs",
      cat_legs_desc: "Turned solid beech wood furniture legs. Classic turned and modern conical models.",
      cat_shelf: "Wall Shelves",
      cat_shelf_desc: "Oval arched natural wood wall shelves. Light and dark tone options.",
      about_label: "Our Story",
      about_title: "Solid Wood Craftsmanship <em>Story</em>",
      about_p1: "We deliver nature's purest form to your hands. Each product is specially shaped for you by master craftsmen.",
      about_p2: "We combine the natural texture of beech wood with modern design philosophy without distorting it. Without chemical processing, we let the wood tell its own story.",
      stores_label: "Stores",
      stores_title: "Our Online Wood Product <em>Stores</em>",
      stores_visit: "Visit Store",
      contact_label: "Contact",
      contact_title: "Get in <em>Touch</em>",
      contact_desc: "Contact us for custom orders, bulk purchases, or any questions.",
      contact_name: "Your Name",
      contact_email: "Your Email",
      contact_message: "Your Message",
      contact_submit: "Send Message",
      contact_phone_label: "Phone",
      contact_email_label: "Email",
      contact_location_label: "Location",
      contact_whatsapp: "Message on WhatsApp",
      footer_products: "Products",
      footer_links: "Links",
      footer_stores: "Stores",
      footer_copyright: "© 2025 masif. All rights reserved.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Use",
      whatsapp_tooltip: "Write on WhatsApp",
      cat_featured: "Featured",
      cat_label_clocks: "Clocks",
      cat_label_deco: "Decoration",
      cat_label_furniture: "Furniture",
      cat_deco_products: "Decorative Products",
      card_desk_clock_desc: "Handcrafted solid wood desk clocks.",
      card_wall_clock_desc: "Elegant models that bring nature and grace to your living spaces.",
      card_candleholders_desc: "Handcrafted wooden candleholder sets and vases.",
      card_legs_desc: "Solid wood furniture legs in various designs, carefully lathe-turned.",
      card_deco_desc: "Handcrafted decorative solid wood objects, signs, and shelves for your living spaces.",
      showcase_desk_badge: "Desk Clocks",
      showcase_desk_title: "Desk Clock Collection",
      showcase_desk_subtitle: "Handcrafted desk clocks that bring character to your workspace, dresser, and living spaces.",
      showcase_vase_badge: "Vase & Candleholder",
      showcase_vase_title: "Vase & Candleholder Collection",
      showcase_vase_subtitle: "Artisan designs that transform your home, combining solid wood warmth with candlelight.",
      showcase_vase_link1: "Vase Collection →",
      showcase_vase_link2: "Candleholder Collection →",
      showcase_deco_badge: "Decoration",
      showcase_deco_title: "Decorative Product Collection",
      showcase_deco_subtitle: "Solid wood signs and minimalist shelves to decorate your walls with natural touches.",
      showcase_wall_badge: "Wall Clocks",
      showcase_wall_title: "Wooden Wall Clock Collection",
      showcase_wall_subtitle: "Unique handcrafted designs that bring the natural texture of solid wood to your walls.",
      about_stat_designs: "Designs",
      about_stat_craft: "Handcrafted",
      about_stat_wood: "Natural Wood",
      stores_badge: "Online Stores",
      stores_subtitle: "Visit our online stores to browse and order our products.",
      store_shopier_name: "Shopier Store",
      store_shopier_desc: "Browse and securely purchase our full product collection on Shopier.",
      store_etsy_main_desc: "Our main store featuring clocks, candleholders, and decorative wooden products.",
      store_etsy_vibe_desc: "Our boutique store featuring special design and creative wooden products.",
      store_hepsiburada_desc: "Discover our solid wood products on Turkey's largest e-commerce platform.",
      store_etsy_legs_desc: "Our dedicated store for wooden furniture legs in various models and sizes.",
      contact_subject: "Subject",
      footer_brand_desc: "Premium design products handcrafted from natural solid wood. Each piece carries a unique story.",
      footer_quick_links: "Quick Links",
      footer_desk_clock: "Desk Clocks",
      footer_wall_clock: "Wall Clocks",
      footer_candleholders_link: "Candleholders",
      footer_vases: "Vases",
      footer_legs_link: "Furniture Legs",
      footer_shelf_link: "Wall Shelves",
      footer_secure_payment: "Secure Payment",
      footer_delivery: "Delivery & Returns",
      footer_copyright_current: "© 2026 masif. All rights reserved."
    }
  };

  var currentLang = localStorage.getItem('masif_lang') || 'tr';

  // Apply translations to all [data-i18n] elements
  function applyTranslations(lang) {
    var t = translations[lang];
    if (!t) return;

    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      if (t[key]) {
        if (t[key].indexOf('<') !== -1) {
          el.innerHTML = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (t[key]) {
        el.setAttribute('placeholder', t[key]);
      }
    });

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update toggle button state
    document.querySelectorAll('.lang-toggle-btn').forEach(function(btn) {
      var btnLang = btn.getAttribute('data-lang');
      btn.classList.toggle('active', btnLang === lang);
    });
  }

  // Switch language
  function switchLang(lang) {
    currentLang = lang;
    localStorage.setItem('masif_lang', lang);
    applyTranslations(lang);
  }

  // Initialize
  function init() {
    var navbar = document.querySelector('.navbar .container');
    if (navbar) {
      var menuToggle = navbar.querySelector('.menu-toggle');
      var toggle = document.createElement('div');
      toggle.className = 'lang-toggle';
      toggle.innerHTML = '<button class="lang-toggle-btn' + (currentLang === 'tr' ? ' active' : '') + '" data-lang="tr">TR</button>' +
                         '<button class="lang-toggle-btn' + (currentLang === 'en' ? ' active' : '') + '" data-lang="en">EN</button>';

      if (menuToggle) {
        navbar.insertBefore(toggle, menuToggle);
      } else {
        navbar.appendChild(toggle);
      }

      toggle.querySelectorAll('.lang-toggle-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          switchLang(this.getAttribute('data-lang'));
        });
      });
    }

    // Apply saved language on load
    if (currentLang !== 'tr') {
      applyTranslations(currentLang);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.switchLang = switchLang;
})();
