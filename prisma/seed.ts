import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const dealers = [
  { name: 'Yılmaz BMW Çıkma', city: 'İstanbul', district: 'Bayrampaşa', brands: ['BMW', 'Mini'], models: ['F30', 'E90', 'F10', 'E46'], partTypes: ['Motor Parçaları', 'Şanzıman', 'Elektrik'], specialties: ['Çıkma Parça', 'OEM Parça'], rating: 4.7, isFeatured: true, plan: 'premium' as const },
  { name: 'Kardeşler Mercedes Parça', city: 'İstanbul', district: 'İkitelli', brands: ['Mercedes'], models: ['W204', 'W212', 'W205', 'Sprinter'], partTypes: ['Kaporta', 'Aydınlatma', 'Süspansiyon'], specialties: ['Orijinal Parça', 'Çıkma Parça'], rating: 4.5, isFeatured: true, plan: 'premium' as const },
  { name: 'VAG Grup Depo', city: 'İstanbul', district: 'Esenyurt', brands: ['Volkswagen', 'Audi', 'Seat', 'Skoda'], models: ['Golf', 'Passat', 'A4', 'A6'], partTypes: ['Motor Parçaları', 'Elektrik', 'Fren Sistemi'], specialties: ['Çıkma Parça', 'Muadil Parça'], rating: 4.3, isFeatured: false, plan: 'gold' as const },
  { name: 'Ankara Oto Çıkma Center', city: 'Ankara', district: 'Ostim', brands: ['BMW', 'Mercedes', 'Audi'], models: ['F30', 'W212', 'A3'], partTypes: ['Motor Parçaları', 'Kaporta', 'Cam'], specialties: ['Çıkma Parça'], rating: 4.6, isFeatured: true, plan: 'premium' as const },
  { name: 'Başkent Ford Parça', city: 'Ankara', district: 'Siteler', brands: ['Ford'], models: ['Focus', 'Fiesta', 'Transit', 'Kuga'], partTypes: ['Kaporta', 'Aydınlatma', 'Fren Sistemi'], specialties: ['Orijinal Parça', 'Muadil Parça'], rating: 4.1, isFeatured: false, plan: 'gold' as const },
  { name: 'Ege Renault Deposu', city: 'İzmir', district: 'Bornova', brands: ['Renault', 'Fiat'], models: ['Clio', 'Megane', 'Linea', 'Egea'], partTypes: ['Motor Parçaları', 'Elektrik', 'Klima'], specialties: ['Çıkma Parça', 'Yerli Üretim'], rating: 4.0, isFeatured: false, plan: 'gold' as const },
  { name: 'İzmir Premium Oto', city: 'İzmir', district: 'Karabağlar', brands: ['BMW', 'Mercedes', 'Volvo'], models: ['E90', 'W204', 'S60', 'XC90'], partTypes: ['Süspansiyon', 'Direksiyon', 'Fren Sistemi'], specialties: ['Orijinal Parça', 'İthal Parça'], rating: 4.8, isFeatured: true, plan: 'premium' as const },
  { name: 'Bursa Hyundai-Kia Parça', city: 'Bursa', district: 'Nilüfer', brands: ['Hyundai', 'Kia'], models: ['Tucson', 'i30', 'Sportage', 'Ceed'], partTypes: ['Kaporta', 'Aydınlatma', 'İç Aksesuar'], specialties: ['Orijinal Parça', 'Muadil Parça'], rating: 4.2, isFeatured: false, plan: 'gold' as const },
  { name: 'Güney Oto Toyota', city: 'Antalya', district: 'Kepez', brands: ['Toyota', 'Honda'], models: ['Corolla', 'Civic', 'RAV4', 'CR-V'], partTypes: ['Motor Parçaları', 'Egzoz', 'Soğutma Sistemi'], specialties: ['Çıkma Parça', 'Yenileme (Rebuild)'], rating: 4.4, isFeatured: false, plan: 'gold' as const },
  { name: 'Konya Alman Oto Parça', city: 'Konya', district: 'Selçuklu', brands: ['BMW', 'Audi', 'Volkswagen'], models: ['320i', 'A3', 'Golf', 'Passat'], partTypes: ['Motor Parçaları', 'Şanzıman', 'Elektrik'], specialties: ['Çıkma Parça', 'OEM Parça'], rating: 4.3, isFeatured: false, plan: 'gold' as const },
  { name: 'Sarıyer Oto Çıkma', city: 'İstanbul', district: 'Sarıyer', brands: ['Peugeot', 'Citroen'], models: ['308', '3008', 'C4', 'C5'], partTypes: ['Kaporta', 'Elektrik', 'Klima'], specialties: ['Çıkma Parça', 'Muadil Parça'], rating: 3.9, isFeatured: false, plan: 'classic' as const },
  { name: 'Anadolu Opel Market', city: 'Ankara', district: 'Sincan', brands: ['Opel', 'Chevrolet'], models: ['Astra', 'Corsa', 'Insignia', 'Cruze'], partTypes: ['Motor Parçaları', 'Fren Sistemi', 'Süspansiyon'], specialties: ['Çıkma Parça', 'Yerli Üretim'], rating: 4.0, isFeatured: false, plan: 'classic' as const },
  { name: 'İstanbul Land Rover Parça', city: 'İstanbul', district: 'Maslak', brands: ['Land Rover', 'Porsche'], models: ['Range Rover', 'Discovery', 'Cayenne', 'Macan'], partTypes: ['Süspansiyon', 'Fren Sistemi', 'Motor Parçaları'], specialties: ['Orijinal Parça', 'İthal Parça'], rating: 4.9, isFeatured: true, plan: 'premium' as const },
  { name: 'Demirci Nissan Parça', city: 'Bursa', district: 'Osmangazi', brands: ['Nissan', 'Mazda', 'Suzuki'], models: ['Qashqai', 'Juke', 'CX-5', 'Vitara'], partTypes: ['Kaporta', 'Aydınlatma', 'Yakıt Sistemi'], specialties: ['Çıkma Parça', 'Muadil Parça'], rating: 4.1, isFeatured: false, plan: 'gold' as const },
  { name: 'Akdeniz BMW Uzmanı', city: 'Antalya', district: 'Muratpaşa', brands: ['BMW', 'Mini'], models: ['F20', 'F30', 'F80', 'Countryman'], partTypes: ['Motor Parçaları', 'Elektrik', 'Şanzıman'], specialties: ['Çıkma Parça', 'OEM Parça'], rating: 4.5, isFeatured: false, plan: 'gold' as const },
  { name: 'Marmara Volvo Deposu', city: 'Kocaeli', district: 'Gebze', brands: ['Volvo'], models: ['S60', 'V40', 'XC60', 'XC90'], partTypes: ['Motor Parçaları', 'Süspansiyon', 'Soğutma Sistemi'], specialties: ['Orijinal Parça', 'İthal Parça'], rating: 4.6, isFeatured: true, plan: 'premium' as const },
  { name: 'Adana Fiat Center', city: 'Adana', district: 'Seyhan', brands: ['Fiat', 'Alfa Romeo'], models: ['Egea', 'Doblo', 'Giulietta'], partTypes: ['Kaporta', 'Elektrik', 'Klima'], specialties: ['Çıkma Parça', 'Yerli Üretim'], rating: 3.8, isFeatured: false, plan: 'classic' as const },
  { name: 'Gaziantep Genel Parça', city: 'Gaziantep', district: 'Şahinbey', brands: ['Ford', 'Renault', 'Fiat', 'Hyundai'], models: ['Focus', 'Clio', 'Egea', 'i20'], partTypes: ['Motor Parçaları', 'Kaporta', 'Fren Sistemi'], specialties: ['Çıkma Parça', 'Muadil Parça'], rating: 4.0, isFeatured: false, plan: 'classic' as const },
  { name: 'Karadeniz Oto Parça', city: 'Samsun', district: 'İlkadım', brands: ['Toyota', 'Hyundai', 'Kia'], models: ['Corolla', 'Accent', 'Rio'], partTypes: ['Kaporta', 'Aydınlatma', 'İç Aksesuar'], specialties: ['Çıkma Parça'], rating: 3.7, isFeatured: false, plan: 'classic' as const },
  { name: 'Kayseri Motor Uzmanı', city: 'Kayseri', district: 'Melikgazi', brands: ['BMW', 'Mercedes'], models: ['N47', 'N57', 'OM651', 'OM642'], partTypes: ['Motor Parçaları', 'Şanzıman', 'Egzoz'], specialties: ['Yenileme (Rebuild)', 'OEM Parça'], rating: 4.7, isFeatured: true },
];

function slugify(text: string): string {
  const map: Record<string, string> = {
    'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G',
    'ı': 'i', 'İ': 'I', 'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U',
  };
  return text
    .split('').map((c) => map[c] || c).join('')
    .toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s]+/g, '-')
    .replace(/-+/g, '-');
}

function randomPhone(): string {
  const prefix = ['532', '533', '534', '535', '536', '537', '538', '539', '541', '542', '543', '544', '545', '546'];
  const p = prefix[Math.floor(Math.random() * prefix.length)];
  const num = Math.floor(1000000 + Math.random() * 9000000).toString();
  return `0${p}${num}`;
}

async function main() {
  // Create admin user
  const passwordHash = await hash('admin123', 10);
  await prisma.adminUser.upsert({
    where: { email: 'admin@hangar.com' },
    update: {},
    create: {
      email: 'admin@hangar.com',
      passwordHash,
      name: 'Admin',
    },
  });
  console.log('Admin user created: admin@hangar.com / admin123');

  // Create dealers
  for (const d of dealers) {
    const phone = randomPhone();
    await prisma.dealer.upsert({
      where: { slug: slugify(d.name) },
      update: {},
      create: {
        name: d.name,
        slug: slugify(d.name),
        phone,
        whatsapp: phone,
        description: `${d.name} - ${d.city} ${d.district} bölgesinde ${d.brands.join(', ')} marka araçlar için yedek parça tedarikçisi.`,
        city: d.city,
        district: d.district,
        brands: d.brands,
        models: d.models,
        partTypes: d.partTypes,
        specialties: d.specialties,
        rating: d.rating,
        isActive: true,
        isFeatured: d.isFeatured,
        plan: d.plan,
      },
    });
  }
  console.log(`${dealers.length} dealers seeded.`);

  // Blog posts
  const posts = [
    {
      title: 'BMW F30 Çıkma Far Alırken Dikkat Edilmesi Gerekenler',
      excerpt: 'F30 kasa BMW sahiplerinin en çok aradığı parçalardan biri olan çıkma far alırken nelere dikkat etmelisiniz? Doğan Kabak anlatıyor.',
      content: `BMW F30 çıkma far almak isteyenler için kapsamlı bir rehber hazırladım. Yıllardır bu işin içindeyim ve gördüğüm en büyük hata, insanların sadece fiyata bakması.\n\nÖncelikle far tipini belirlemeniz gerekiyor: Halogen mi, Xenon mu, yoksa LED mi? F30'un üretim yılına göre farklı far tipleri mevcut. 2012-2015 arası modellerde genellikle halogen veya xenon bulunurken, LCI sonrası modellerde LED farlar standart.\n\nÇıkma far alırken mutlaka kontrol edin:\n- Cam üzerinde çatlak veya kırık var mı?\n- İç reflektör yanmış mı? (Özellikle xenonlarda sık görülür)\n- Su girişi izi var mı?\n- Konnektör pinleri sağlam mı?\n\nBenim tavsiyem, mümkünse parçayı yerinde görün. Fotoğraftan anlaşılmayan detaylar olabiliyor. Hangar üzerinden BMW uzmanı esnaflara ulaşıp WhatsApp\'tan fotoğraf isteyebilirsiniz.\n\nFiyat aralığı olarak 2024 itibariyle:\n- Halogen far: 2.000 - 4.000 TL\n- Xenon far: 5.000 - 8.000 TL\n- LED far: 8.000 - 15.000 TL\n\nUnutmayın, ucuz far pahalıya patlar. Kaliteli bir çıkma far, muadil bir yeni fardan her zaman daha iyidir.`,
      author: 'Doğan Kabak',
      category: 'rehber',
      tags: ['BMW', 'F30', 'Far', 'Çıkma Parça'],
    },
    {
      title: 'Mercedes W204 Kaporta Parçaları: Orijinal mi Çıkma mı?',
      excerpt: 'W204 C serisi için kaporta parçası alacaksanız orijinal mi yoksa çıkma mı tercih etmelisiniz? Ünal Turan karşılaştırıyor.',
      content: `Mercedes W204 sahipleri için kaporta parçası seçimi her zaman tartışmalı bir konu. Ben Ünal Turan, 15 yıllık Mercedes uzmanı olarak bu konuda görüşlerimi paylaşmak istiyorum.\n\nOrijinal parça dediğimizde Mercedes-Benz\'in kendi ürettiği parçalardan bahsediyoruz. Kalite tartışmasız ama fiyat da tartışmasız yüksek. Bir W204 ön tampon orijinal olarak 8.000-12.000 TL arasında.\n\nÇıkma parça ise kazalı araçlardan sökülen orijinal parçalar. Aynı kalite, yarı fiyat. Ama dikkat etmeniz gereken şeyler var:\n\n1. Renk uyumu: Çıkma parçanın renk kodu aracınızla aynı mı?\n2. Boya durumu: Parça boyanmış mı, orijinal boyası mı?\n3. Darbe izi: İnce çizikler kabul edilebilir ama ezik varsa düşünün\n\nBenim önerim: Kaporta parçalarında mümkünse çıkma tercih edin ama boyasız olanları seçin. Boyalı çıkma parçada altında ne olduğunu bilemezsiniz.\n\nHangar\'daki Mercedes uzmanı esnaflar bu konuda size çok yardımcı olabilir. Doğru parçayı bulmak artık çok kolay.`,
      author: 'Ünal Turan',
      category: 'tavsiye',
      tags: ['Mercedes', 'W204', 'Kaporta', 'Orijinal Parça'],
    },
    {
      title: 'Tunç Mete ile Oto Parça Dünyası: Yeni Nesil Parça Tedariği',
      excerpt: 'Sponsorlu içerik: Tunç Mete, oto yedek parça sektöründeki dijital dönüşümü ve Hangar platformunun esnaflar için sunduğu fırsatları değerlendiriyor.',
      content: `Merhaba, ben Tunç Mete. Oto yedek parça sektörünü yakından takip eden biri olarak Hangar platformunu inceleme fırsatım oldu ve izlenimlerimi sizlerle paylaşmak istiyorum.\n\nBu içerik Hangar sponsorluğunda hazırlanmıştır.\n\nGeleneksel oto yedek parça ticareti hâlâ büyük oranda telefon ve tanıdık ağı üzerinden yürüyor. Sanayideki esnafların çoğunun web sitesi yok, sosyal medya hesapları güncellenmiyor. Müşteriler ise doğru parçayı bulmak için saatlerce telefon açıyor.\n\nHangar tam bu noktada devreye giriyor:\n- Esnaflar tek bir platformda profil oluşturuyor\n- Müşteriler araç bilgilerini girip uygun esnafları buluyor\n- WhatsApp entegrasyonu ile anında iletişim kuruluyor\n\nBenim gözlemim, bu tür platformların sektörü ciddi anlamda dönüştüreceği yönünde. Özellikle küçük esnaflar için büyük bir fırsat. Daha önce sadece çevre tanıdıkları üzerinden iş yapan esnaflar, artık Türkiye\'nin her yerinden müşteriye ulaşabiliyor.\n\nTunç Mete olarak bu dönüşümü destekliyorum ve esnaflarımıza Hangar\'a kaydolmalarını tavsiye ediyorum.`,
      author: 'Tunç Mete',
      category: 'sponsorlu',
      tags: ['Sponsorlu', 'Dijital Dönüşüm', 'Esnaf'],
    },
    {
      title: 'Kuzenimin Tavsiyesi: Şasi Numarasıyla Parça Arama Rehberi',
      excerpt: 'Kuzen Emre, şasi numarası (VIN) kullanarak doğru yedek parçayı bulmanın püf noktalarını paylaşıyor.',
      content: `Selamlar, ben Kuzen Emre. Evet, herkesin bir kuzeni vardır ya hani, otomotiv konusunda her şeyi bilen bir kuzeni... İşte o benim.\n\nBugün size şasi numarası yani VIN kodu ile parça aramanın öneminden bahsedeceğim. Çoğu insan "BMW 320" deyip parça arıyor ama bu yeterli değil. Hangi 320? E90 mı, F30 mu, G20 mi? Motor kodu ne? N47 mi, B47 mi?\n\nİşte şasi numarası tam da bu karmaşayı ortadan kaldırıyor.\n\nVIN kodu 17 haneli bir koddur ve aracınızın:\n- Üretici bilgisi (1-3. haneler)\n- Model ve donanım bilgisi (4-9. haneler)\n- Üretim yılı (10. hane)\n- Üretim fabrikası (11. hane)\n- Seri numarası (12-17. haneler)\n\nŞasi numaranızı nereden bulabilirsiniz?\n- Ruhsatta yazıyor\n- Ön camın sol alt köşesinde\n- Sürücü kapısı iç pervazında\n- Motor bloğu üzerinde\n\nHangar\'da parça talebi oluştururken şasi numaranızı girmeniz, esnafların size tam doğru parçayı bulmalarını kolaylaştırıyor. Kuzeniniz olarak söylüyorum, bu adımı atlamayın!\n\nHa bir de, şasi numarasını internette paylaşırken dikkatli olun. Dolandırıcılar bu bilgiyle sahte ruhsat çıkarabiliyor. Güvendiğiniz esnaflara verin sadece.`,
      author: 'Kuzen Emre',
      category: 'tavsiye',
      tags: ['VIN', 'Şasi Numarası', 'Rehber', 'Parça Arama'],
    },
    {
      title: 'Volkswagen DSG Şanzıman Beyin Tamiri: Bilmeniz Gerekenler',
      excerpt: 'DSG şanzıman beyni arızalandığında ne yapmalısınız? Doğan Kabak, tamirden yenisine tüm seçenekleri değerlendiriyor.',
      content: `DSG şanzıman, Volkswagen grubunun (VW, Audi, Seat, Skoda) birçok modelinde kullanılan çift kavramalı otomatik şanzıman sistemi. Performansı harika ama arıza yaptığında cüzdanınız ağlıyor.\n\nEn sık karşılaşılan DSG arızası mekatronik ünite (şanzıman beyni) arızasıdır.\n\nBelirtileri:\n- Vites geçişlerinde sarsıntı\n- Ani vites atlama\n- Göstergede şanzıman uyarı lambası\n- Araç limp moduna geçme\n\nSeçenekleriniz:\n1. Sıfır mekatronik ünite: 25.000 - 40.000 TL (oha diyorsunuz, biliyorum)\n2. Çıkma mekatronik ünite: 8.000 - 15.000 TL\n3. Tamir (rebuild): 5.000 - 10.000 TL\n\nBenim tavsiyem rebuild yaptırmak. İyi bir DSG uzmanı, mekatronik üniteyi açıp arızalı parçaları değiştirip size uzun süre sorunsuz kullanım sağlayabilir.\n\nHangar\'da VAG grubu uzmanı esnaflar var. Onlara ulaşıp fiyat karşılaştırması yapabilirsiniz.`,
      author: 'Doğan Kabak',
      category: 'rehber',
      tags: ['Volkswagen', 'DSG', 'Şanzıman', 'Mekatronik'],
    },
    {
      title: "2024'ün En Çok Aranan Çıkma Parçaları",
      excerpt: 'Selin Yıldırım, Hangar verilerine göre 2024 yılında en çok aranan çıkma parçaları analiz ediyor.',
      content: `Merhaba, ben Selin Yıldırım. Hangar platformundaki arama verilerini analiz ettim ve 2024\'ün en çok aranan çıkma parçalarını sizlerle paylaşıyorum.\n\nTop 10 Listesi:\n\n1. BMW F30 Far (LED ve Xenon) - Açık ara birinci\n2. Mercedes W212 Ön Tampon\n3. Volkswagen Golf 7 Şanzıman Beyni\n4. Ford Focus 3 Kaporta Seti\n5. Renault Clio 4 Motor Takımı\n6. Audi A4 B8 Multitronic Şanzıman\n7. Fiat Egea Göğüs Paneli\n8. Hyundai Tucson Ön Panel\n9. Toyota Corolla Far Seti\n10. Opel Astra J Turbo Motoru\n\nDikkat çeken noktalar:\n- Alman araçların parçaları ilk 6\'da\n- Far ve aydınlatma parçaları en çok aranan kategori\n- Şanzıman parçaları giderek artıyor\n- Kaporta parçaları her zaman talep görüyor\n\nBu veriler gösteriyor ki, özellikle BMW ve Mercedes uzmanı esnafların Hangar\'da olması büyük avantaj. Talep burada, müşteri burada.`,
      author: 'Selin Yıldırım',
      category: 'haber',
      tags: ['İstatistik', 'Çıkma Parça', 'Trend', '2024'],
    },
    {
      title: "Ünal Turan'ın Garaj Notları: Egzoz Sistemi Bakımı",
      excerpt: 'Egzoz sistemindeki sorunları erken tespit etmenin yolları ve bakım önerileri.',
      content: `Ünal Turan\'ın Garaj Notları serisine hoş geldiniz. Bu hafta egzoz sistemi bakımını konuşacağız.\n\nEgzoz sistemi denince akla sadece susturucu gelmesin. Tam bir egzoz sistemi şunlardan oluşur:\n- Egzoz manifoldu\n- Katalitik konvertör (katalizör)\n- Orta susturucu\n- Arka susturucu\n- Lambda sensörleri\n- Egzoz kelepçeleri ve contaları\n\nSorun belirtileri:\n- Motor sesi normalden yüksek: Muhtemelen bir yerde delik veya çatlak var\n- Performans kaybı: Katalitik konvertör tıkanmış olabilir\n- Egzozdan aşırı duman: Motor yağı yakıyor olabilir\n- Yakıt tüketimi artışı: Lambda sensörü arızalı olabilir\n\nKatalizör fiyatları uçmuş durumda, içindeki değerli metaller yüzünden. Çıkma katalizör bulmak da zor çünkü herkes satıyor. Bu durumda muadil katalizör düşünülebilir.\n\nEsnafınızla konuşurken egzoz çapını ve bağlantı tipini mutlaka belirtin. Yanlış çaptaki egzoz hem performansı düşürür hem de sızıntıya neden olur.`,
      author: 'Ünal Turan',
      category: 'tavsiye',
      tags: ['Egzoz', 'Bakım', 'Katalitik Konvertör'],
    },
    {
      title: 'Çıkma Parça Alırken Dolandırılmamak İçin 7 Altın Kural',
      excerpt: 'Kuzen Emre, çıkma parça alışverişinde dolandırılmamak için bilmeniz gereken 7 altın kuralı paylaşıyor.',
      content: `Kuzeniniz Emre yine burada. Bu sefer ciddi bir konudan bahsedeceğim: Çıkma parça dolandırıcılığı.\n\nMaalesef sektörde "çıkma" diye boyalı kaporta satan, "orijinal" diye muadil veren tipler var. İşte korunmanın 7 altın kuralı:\n\n1. FOTOĞRAF İSTEYİN: Sadece stok fotoğrafı değil, parçanın gerçek fotoğrafını. Üzerinde tarih yazılı bir kağıtla birlikte.\n\n2. OEM KODU SORUN: Her orijinal parçanın bir OEM kodu vardır. Bu kodu Google\'da aratarak doğru parça mı kontrol edebilirsiniz.\n\n3. İADE ŞARTLARINI ÖĞRENIN: İyi esnaf iade kabul eder. "Satılan mal geri alınmaz" diyen yerden almayın.\n\n4. KARGO ÖNCESİ VİDEO İSTEYİN: Özellikle elektronik parçalarda çalıştığını gösteren video şart.\n\n5. ÖN ÖDEMELİ ÇALIŞMAYIN: Kapıda ödeme veya en fazla yarı ön ödeme. Tam ön ödeme = risk.\n\n6. REFERANS ARAŞTIRIN: Google yorumları, Hangar profil puanı, tanıdık tavsiyesi.\n\n7. HANGAR KULLANIN: Hangar\'daki esnaflar profil ve puan sistemiyle güvenilirliklerini kanıtlamış esnaflar.\n\nBu kuralları uygularsanız kuzeniniz Emre de rahat eder, siz de.`,
      author: 'Kuzen Emre',
      category: 'rehber',
      tags: ['Güvenlik', 'Dolandırıcılık', 'Alışveriş Rehberi'],
    },
    {
      title: 'Fiat Egea Motor Arızaları ve Çözümleri',
      excerpt: 'Türkiye\'nin en çok satan aracı Fiat Egea\'nın sık karşılaşılan motor arızaları ve çözüm yolları.',
      content: `Fiat Egea, Türkiye\'nin en çok satan aracı olarak milyonlarca kullanıcıya sahip. Doğal olarak parça talebi de çok yüksek.\n\nEn sık karşılaşılan motor arızaları:\n\n1.3 Multijet Motor:\n- Turbo arızası: 80.000-120.000 km arası sık görülür. Çıkma turbo 3.000-5.000 TL.\n- Enjektör arızası: Kötü yakıt kullanımından kaynaklanır. Revize enjektör 1.500-2.500 TL.\n- EGR valf tıkanması: Temizleme veya değişim gerektirir.\n\n1.4 Fire Motor:\n- Supap kapağı conta kaçağı: Çok yaygın, basit tamir.\n- Yağ pompası arızası: Ciddi bir sorun, erken müdahale şart.\n\n1.6 Multijet Motor:\n- Çift kütle volant arızası: Sert vites geçişleri belirtisi. Değişim maliyetli.\n- AdBlue sistem arızaları: Özellikle Euro 6 motorlarda.\n\nHangar\'da Fiat uzmanı esnaflar bulabilir ve en uygun fiyatlı çıkma parçayı temin edebilirsiniz. Özellikle Egea parçalarında stok sıkıntısı yaşanmıyor çünkü talep çok.`,
      author: 'Doğan Kabak',
      category: 'rehber',
      tags: ['Fiat', 'Egea', 'Motor Arızası', 'Multijet'],
    },
    {
      title: 'Tunç Mete Sponsorluğunda: Esnaflar İçin Dijital Pazarlama 101',
      excerpt: 'Sponsorlu içerik: Oto yedek parça esnafları için dijital dünyada var olmanın yolları.',
      content: `Bu içerik Tunç Mete sponsorluğunda hazırlanmıştır.\n\nSevgili esnaf dostlarım, dijital çağda müşteri artık Google\'da arıyor, sanayi sanayi gezmiyor. Peki siz dijital dünyada nasıl var olacaksınız?\n\nİşte basit adımlar:\n\n1. Hangar Profilinizi Açın: İlk adım burada. Profesyonel bir profil, güvenilirlik demektir.\n\n2. Google İşletme Profilinizi Oluşturun: Ücretsiz ve çok etkili. "Yakınımdaki oto çıkma" aramasında çıkmanızı sağlar.\n\n3. WhatsApp Business Kullanın: Normal WhatsApp değil, Business versiyonu. Katalog oluşturabilir, otomatik mesaj ayarlayabilirsiniz.\n\n4. Fotoğraf Çekin: Parçalarınızın fotoğrafını çekin. Güzel olması gerekmiyor, gerçek olması gerekiyor.\n\n5. Fiyat Şeffaflığı: "Arayın" yerine yaklaşık fiyat verin. Müşteri karşılaştırma yapıyor.\n\nHangar Premium üyelik ile tüm bu avantajları tek bir platformda bulabilirsiniz. Tunç Mete olarak denemenizi tavsiye ederim.`,
      author: 'Tunç Mete',
      category: 'sponsorlu',
      tags: ['Sponsorlu', 'Dijital Pazarlama', 'Esnaf Rehberi'],
    },
    {
      title: 'Kış Geldi: Aracınızı Kışa Hazırlamanın 10 Adımı',
      excerpt: 'Selin Yıldırım, kış mevsimi öncesi aracınızda kontrol etmeniz gereken 10 kritik noktayı sıralıyor.',
      content: `Kış kapıda ve aracınızı hazırlamadıysanız geç kalmadan bu listeyi takip edin.\n\n1. AKÜ KONTROLÜ: Soğuk havalarda akü performansı düşer. 3 yaşını geçmiş aküyü değiştirin.\n\n2. ANTİFRİZ SEVİYESİ: Radyatör suyundaki antifriz oranı en az %-35 olmalı.\n\n3. LASTİK DEĞİŞİMİ: 7°C altında yaz lastiği tutmaz. Kış lastiği şart.\n\n4. FREN KONTROLÜ: Balata ve disk kalınlığını kontrol ettirin.\n\n5. SİLECEK DEĞİŞİMİ: Eski silecekler yağmurda görüş kaybına neden olur.\n\n6. FAR KONTROLÜ: Tüm farlarınızın çalıştığından emin olun.\n\n7. ISITMA SİSTEMİ: Kalorifer çalışıyor mu? Klima filtresi ne durumda?\n\n8. KAPI CONTLARI: Silikon sprey ile yağlayın, donmasını önleyin.\n\n9. ACİL KIT: Battaniye, el feneri, çekme halatı, takviye kablosu.\n\n10. YEDEK PARÇA: Yedek ampul seti ve sigorta seti bulundurun.\n\nBu parçaların çoğunu Hangar üzerinden uygun fiyata bulabilirsiniz. Özellikle akü ve fren parçalarında çıkma seçenekleri mevcut.`,
      author: 'Selin Yıldırım',
      category: 'tavsiye',
      tags: ['Kış Bakımı', 'Araç Bakımı', 'Mevsimsel'],
    },
    {
      title: 'OEM Kodu Nedir ve Nasıl Kullanılır?',
      excerpt: 'Doğan Kabak, OEM kodunun ne olduğunu ve doğru parçayı bulmak için nasıl kullanacağınızı anlatıyor.',
      content: `OEM kodu (Original Equipment Manufacturer), her otomobil parçasına üretici tarafından verilen benzersiz bir kimlik numarasıdır.\n\nNeden önemli?\n- Aynı parçanın farklı araçlarda farklı versiyonları olabilir\n- Sadece marka-model bilgisi yeterli olmayabilir\n- OEM kodu ile %100 doğru parçayı bulursunuz\n\nOEM kodunu nereden bulabilirsiniz?\n- Parçanın üzerinde (genellikle etiket veya kabartma yazı)\n- Servis kitapçığında\n- Online OEM kataloglarında (ETK, EPC vb.)\n- Eski parçanın üzerinde\n\nÖrnek OEM kodları:\n- BMW Far: 63117338707 (F30 sol far)\n- Mercedes Tampon: A2048850025 (W204 ön tampon)\n- VW Fren Diski: 5Q0615301F (Golf 7 ön fren diski)\n\nHangar\'da parça talebi oluştururken OEM kodunu belirtmeniz, esnafların doğru parçayı bulmasını çok kolaylaştırır. Kuzen Emre de aynı şeyi söyler.`,
      author: 'Doğan Kabak',
      category: 'rehber',
      tags: ['OEM', 'Parça Kodu', 'Rehber'],
    },
    {
      title: 'Sanayiden Hikayeler: Bir Çıkma Parçacının Günlüğü',
      excerpt: 'Ünal Turan, sanayideki bir çıkma parçacının tipik bir gününü ve sektörün bilinmeyen yüzünü anlatıyor.',
      content: `Sabah 7: Sanayi henüz uyanıyor. İlk çay içilmeden telefon çalmaya başlıyor. "Abi W212 sol ayna var mı?"\n\nSabah 8: Dükkan açıldı. Dünkü gelen parçaları yerleştiriyoruz. Bir kazalı E90 gelmiş, parçalarını ayırıyoruz. Far sağlam, tampon parçalanmış, motor yürüyor.\n\nSabah 10: WhatsApp çılgınlığı başladı. 15 mesaj, 8\'i "fiyat ne?", 5\'i fotoğraf istiyor, 2\'si pazarlık yapıyor. Hangar\'dan gelen talepler daha düzgün, en azından araç bilgisi tam geliyor.\n\nÖğle: Kargo zamanı. 3 paket gönderiyoruz. İstanbul\'dan Antalya\'ya bir far, Ankara\'ya bir tampon, Bursa\'ya bir motor kulağı.\n\nÖğleden sonra 2: Bir müşteri geldi, "bu parça uyar mı?" diye soruyor. Elinde yanlış OEM kodu var. Doğrusunu buluyoruz, parçayı veriyoruz. Mutlu gidiyor.\n\nAkşam 6: Hesap zamanı. Bugün 5 parça sattık, 3 tane iade geldi (biri yanlış sipariş, biri fikrini değiştirdi, biri "eşim istemedi" dedi). Bu iş sabır işi.\n\nAkşam 7: Dükkan kapanıyor ama WhatsApp kapanmıyor. Son mesaj gece 11\'de geliyor: "Abi yarına kadar lazım, kargolayabilir misin?" Abi yarın Pazar...`,
      author: 'Ünal Turan',
      category: 'haber',
      tags: ['Sanayi', 'Esnaf Hayatı', 'Günlük'],
    },
    {
      title: 'Hangar Esnaf Başarı Hikayesi: Yılmaz BMW Çıkma',
      excerpt: 'Sponsorlu içerik: Bayrampaşa\'daki Yılmaz BMW Çıkma, Hangar sayesinde müşteri portföyünü nasıl genişletti?',
      content: `Bu içerik Hangar sponsorluğunda hazırlanmıştır.\n\nYılmaz Usta, Bayrampaşa sanayide 20 yıldır BMW çıkma parça satıyor. "Eskiden sadece çevredeki tamirciler gelirdi" diyor. "Şimdi Antalya\'dan, Trabzon\'dan sipariş alıyorum."\n\nHangar Premium üye olan Yılmaz Usta\'nın hikayesi:\n\n"Oğlum bana Hangar\'ı gösterdi. \'Baba profil aç, fotoğraf koy\' dedi. Ben teknolojiden anlamam ama WhatsApp kullanabiliyorum. Hangar\'da profilimi açtık, parça taleplerini almaya başladım."\n\n"İlk ay 5-6 talep geldi. İkinci aydan itibaren düzenli 15-20 talep görüyorum. Bunların yarısı satışa dönüyor. Kargo ile gönderiyorum."\n\nSonuçlar:\n- Aylık müşteri sayısı: %60 artış\n- Kargo ile satış: Sıfırdan 30\'a çıktı\n- Google\'da aranabilirlik: Hangar profili sayesinde\n\nYılmaz Usta\'nın tavsiyesi: "Fotoğrafları güzel çekin, fiyatı net söyleyin, hızlı dönüş yapın. Müşteri güven arıyor."`,
      author: 'Tunç Mete',
      category: 'sponsorlu',
      tags: ['Sponsorlu', 'Başarı Hikayesi', 'BMW', 'Esnaf'],
    },
    {
      title: 'Aracınızın Değerini Korumak İçin Parça Seçimi Rehberi',
      excerpt: 'Kuzen Emre, ikinci el değerini korumak isteyenler için doğru parça seçim stratejisini paylaşıyor.',
      content: `Kuzeniniz yine sahnede! Bu sefer aracınızın ikinci el değerini korurken parça seçiminin nasıl olması gerektiğinden bahsedeceğim.\n\nKural 1: Mekanik parçalarda çıkma, görsel parçalarda orijinal\nMotor, şanzıman gibi mekanik parçalarda kaliteli çıkma kullanmak mantıklı. Ama tampon, far gibi dışarıdan görünen parçalarda orijinal veya orijinal kalitesinde parça kullanın. Alıcı ilk izlenime bakar.\n\nKural 2: Servis bakım geçmişini tutun\nHangi parçayı ne zaman değiştirdiğinizi kayıt altına alın. Alıcılar bunu soruyor.\n\nKural 3: Muadil parçadan kaçının (bazı durumlarda)\nFren, süspansiyon gibi güvenlik parçalarında muadil kullanmayın. Hem güvenlik hem de ikinci el değeri açısından risk.\n\nKural 4: Boya işlerini profesyonele yaptırın\nKaporta parçası değiştirdiyseniz boyayı iyi bir boyacıda yaptırın. Kötü boya ikinci el değerini düşürür.\n\nKuzeninizin son sözü: Aracınıza yatırım yapın ama akıllıca yapın. Hangar\'daki esnaflardan fiyat karşılaştırması yaparak en doğru kararı verin.`,
      author: 'Kuzen Emre',
      category: 'tavsiye',
      tags: ['İkinci El', 'Araç Değeri', 'Parça Seçimi'],
    },
  ];

  for (const p of posts) {
    await prisma.blogPost.upsert({
      where: { slug: slugify(p.title) },
      update: {},
      create: {
        title: p.title,
        slug: slugify(p.title),
        excerpt: p.excerpt,
        content: p.content,
        author: p.author,
        category: p.category,
        tags: p.tags,
      },
    });
  }
  console.log(`${posts.length} blog posts seeded.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
