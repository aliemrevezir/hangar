import type { BlogPost, Dealer } from '@prisma/client';

type BlogFilters = {
  kategori?: string;
  yazar?: string;
};

type DealerFilters = {
  city?: string;
  brand?: string;
  partType?: string;
  search?: string;
  page?: number;
  limit?: number;
};

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Mercedes W204 Kaporta Parcalari: Orijinal mi Cikma mi?',
    slug: 'mercedes-w204-kaporta-orijinal-mi-cikma-mi',
    excerpt:
      'W204 C serisi icin kaporta parcasi alacaksaniz orijinal mi yoksa cikma mi tercih etmelisiniz? Kisa bir karsilastirma.',
    content:
      'Mercedes W204 sahipleri icin kaporta parcasi secimi her zaman tartismali bir konu. Orijinal parcada kalite cok yuksek ama fiyat da yuksek olur.\n\nCikma parcada ayni kaliteyi daha uygun fiyata bulabilirsiniz. Burada kritik nokta parcanin darbeli olup olmadigini, boya gecmisini ve OEM kodunu kontrol etmektir.\n\nOzetle: kozmetik ve kaporta parcalarinda temiz cikma mantikli olabilir, kritik guvenlik parcalarinda ise orijinale daha yakin secimler yapilmalidir.',
    author: 'Ünal Turan',
    category: 'tavsiye',
    tags: ['Mercedes', 'W204', 'Kaporta'],
    isPublished: true,
    createdAt: new Date('2026-02-10T09:00:00.000Z'),
    updatedAt: new Date('2026-02-10T09:00:00.000Z'),
  },
  {
    id: 'blog-2',
    title: 'Volkswagen DSG Sanziman Beyin Tamiri Rehberi',
    slug: 'volkswagen-dsg-sanziman-beyin-tamiri-rehberi',
    excerpt:
      'DSG mekatronik arizalarinda sifir, cikma ve rebuild seceneklerinin arti-eksi yonleri.',
    content:
      'DSG sanziman performansli bir sistemdir ancak mekatronik arizalari maliyetli olabilir.\n\nSifir unite en pahali secenektir. Cikma unite daha ucuz olabilir ama gecmisi belirsizdir. Rebuild ise iyi bir uzmanla maliyet/performans acisindan guclu bir alternatif olabilir.\n\nParca seciminde aracinizla uyumlu OEM kodunu dogrulamayi unutmayin.',
    author: 'Doğan Kabak',
    category: 'rehber',
    tags: ['Volkswagen', 'DSG', 'Sanziman'],
    isPublished: true,
    createdAt: new Date('2026-02-05T10:30:00.000Z'),
    updatedAt: new Date('2026-02-05T10:30:00.000Z'),
  },
  {
    id: 'blog-3',
    title: 'Tunç Mete ile Esnaflar icin Dijital Donusum',
    slug: 'tunc-mete-ile-esnaflar-icin-dijital-donusum',
    excerpt:
      'Sponsorlu icerik: Esnaflarin dijitalde gorunur olmasi ve yeni musteri kazanimi uzerine notlar.',
    content:
      'Bu icerik sponsorluk kapsaminda hazirlanmistir.\n\nGeleneksel parca ticaretinde telefon trafigi yogun olsa da dogru dijital vitrinle daha genis bir musteri kitlesine ulasmak mumkun.\n\nProfil bilgilerini guncel tutmak, net stok/fiyat bilgisi vermek ve hizli iletisim kanallari kullanmak donusumu ciddi sekilde etkiler.',
    author: 'Tunç Mete',
    category: 'sponsorlu',
    tags: ['Sponsorlu', 'Dijital Donusum'],
    isPublished: true,
    createdAt: new Date('2026-01-28T12:00:00.000Z'),
    updatedAt: new Date('2026-01-28T12:00:00.000Z'),
  },
  {
    id: 'blog-4',
    title: '2026 Ilk Ceyrekte En Cok Aranan Cikma Parcalar',
    slug: '2026-ilk-ceyrekte-en-cok-aranan-cikma-parcalar',
    excerpt:
      'Far, kaporta ve sanziman parcalari taleplerinde dikkat ceken artisi ele aliyoruz.',
    content:
      'Ilk ceyrek verilerine gore far ve kaporta parcalarina talep yuksek seyretti.\n\nSanziman parcasi taleplerinin artmasi, ikinci el otomatik arac pazarindaki hareketlilikle paralel gorunuyor.\n\nDogru parcayi daha hizli bulmak icin VIN ve OEM koduyla talep acmak sureci kisaltir.',
    author: 'Selin Yıldırım',
    category: 'haber',
    tags: ['Trend', 'Cikma Parca', 'Analiz'],
    isPublished: true,
    createdAt: new Date('2026-01-20T08:15:00.000Z'),
    updatedAt: new Date('2026-01-20T08:15:00.000Z'),
  },
  {
    id: 'blog-5',
    title: 'Sasi Numarasiyla Dogru Parca Bulmanin Puf Noktalari',
    slug: 'sasi-numarasiyla-dogru-parca-bulmanin-puf-noktalari',
    excerpt:
      'VIN kodu neden onemli, nereden bulunur ve talep acarken nasil kullanilir?',
    content:
      'Arac markasi ve modeli tek basina her zaman yeterli olmaz. Ayni modelin farkli motor ve donanim kombinasyonlari olabilir.\n\nVIN kodu bu belirsizligi azaltir. Talep acarken VIN bilgisi eklerseniz uyumsuz parca riskini ciddi sekilde dusurebilirsiniz.\n\nVIN bilgisini herkese acik platformlarda paylasmaktan kacinin.',
    author: 'Kuzen Emre',
    category: 'tavsiye',
    tags: ['VIN', 'Sasi Numarasi', 'Parca Arama'],
    isPublished: true,
    createdAt: new Date('2026-01-12T14:40:00.000Z'),
    updatedAt: new Date('2026-01-12T14:40:00.000Z'),
  },
  {
    id: 'blog-6',
    title: 'Kisa Rehber: OEM Kodu Nedir?',
    slug: 'kisa-rehber-oem-kodu-nedir',
    excerpt:
      'OEM kodu ile dogru parcayi esitlestirmek neden hayati? Pratik bir baslangic rehberi.',
    content:
      'OEM kodu, ureticinin parcaya verdigi benzersiz kimliktir.\n\nAyni model araclarda yil ve donanim farki nedeniyle parca kodu degisebilir. Bu nedenle siparis oncesi OEM kodu kontrolu yapmak hata maliyetini azaltir.\n\nMumkunse eski parcanin kodunu fotograflayip esnafa oyle iletin.',
    author: 'Doğan Kabak',
    category: 'rehber',
    tags: ['OEM', 'Rehber'],
    isPublished: true,
    createdAt: new Date('2026-01-04T16:10:00.000Z'),
    updatedAt: new Date('2026-01-04T16:10:00.000Z'),
  },
];

export const mockDealers: Dealer[] = [
  {
    id: 'dealer-1',
    name: 'Yilmaz BMW Cikma',
    slug: 'yilmaz-bmw-cikma',
    phone: '+905321112233',
    whatsapp: '+905321112233',
    description: 'BMW ve Mini modelleri icin cikma ve OEM odakli parca tedarigi.',
    city: 'İstanbul',
    district: 'Bayrampaşa',
    address: 'Bayrampasa Oto Sanayi Sitesi, No: 12',
    brands: ['BMW', 'Mini'],
    models: ['F30', 'E90', 'F10', 'E46'],
    partTypes: ['Motor Parçaları', 'Şanzıman', 'Elektrik'],
    specialties: ['Çıkma Parça', 'OEM Parça'],
    rating: 4.7,
    isActive: true,
    isFeatured: true,
    plan: 'premium',
    logoUrl: null,
    createdAt: new Date('2025-12-01T09:00:00.000Z'),
    updatedAt: new Date('2026-01-10T09:00:00.000Z'),
  },
  {
    id: 'dealer-2',
    name: 'Kardeşler Mercedes Parça',
    slug: 'kardesler-mercedes-parca',
    phone: '+905334445566',
    whatsapp: '+905334445566',
    description: 'Mercedes kaporta ve aydınlatma grubunda hızlı stok servisi.',
    city: 'İstanbul',
    district: 'İkitelli',
    address: 'İkitelli Sanayi Sitesi 3. Blok',
    brands: ['Mercedes'],
    models: ['W204', 'W212', 'W205'],
    partTypes: ['Kaporta', 'Aydınlatma', 'Süspansiyon'],
    specialties: ['Orijinal Parça', 'Çıkma Parça'],
    rating: 4.5,
    isActive: true,
    isFeatured: true,
    plan: 'premium',
    logoUrl: null,
    createdAt: new Date('2025-12-03T09:00:00.000Z'),
    updatedAt: new Date('2026-01-12T09:00:00.000Z'),
  },
  {
    id: 'dealer-3',
    name: 'VAG Grup Depo',
    slug: 'vag-grup-depo',
    phone: '+905355667788',
    whatsapp: '+905355667788',
    description: 'VW, Audi, Seat ve Skoda için mekatronik ve motor parçası uzmanlığı.',
    city: 'İstanbul',
    district: 'Esenyurt',
    address: 'Esenyurt Oto Ticaret Merkezi',
    brands: ['Volkswagen', 'Audi', 'Seat', 'Skoda'],
    models: ['Golf', 'Passat', 'A4', 'A6'],
    partTypes: ['Motor Parçaları', 'Elektrik', 'Fren Sistemi'],
    specialties: ['Çıkma Parça', 'Muadil Parça'],
    rating: 4.3,
    isActive: true,
    isFeatured: false,
    plan: 'gold',
    logoUrl: null,
    createdAt: new Date('2025-12-05T09:00:00.000Z'),
    updatedAt: new Date('2026-01-15T09:00:00.000Z'),
  },
  {
    id: 'dealer-4',
    name: 'Başkent Ford Parça',
    slug: 'baskent-ford-parca',
    phone: '+905322223344',
    whatsapp: '+905322223344',
    description: 'Ford modelleri icin kaporta ve fren sistemleri odakli satis.',
    city: 'Ankara',
    district: 'Siteler',
    address: 'Siteler Oto Çarşı, A Blok',
    brands: ['Ford'],
    models: ['Focus', 'Fiesta', 'Transit'],
    partTypes: ['Kaporta', 'Aydınlatma', 'Fren Sistemi'],
    specialties: ['Orijinal Parça', 'Muadil Parça'],
    rating: 4.1,
    isActive: true,
    isFeatured: false,
    plan: 'gold',
    logoUrl: null,
    createdAt: new Date('2025-12-10T09:00:00.000Z'),
    updatedAt: new Date('2026-01-08T09:00:00.000Z'),
  },
  {
    id: 'dealer-5',
    name: 'İzmir Premium Oto',
    slug: 'izmir-premium-oto',
    phone: '+905366778899',
    whatsapp: '+905366778899',
    description: 'Premium segment araclar icin yuksek puanli parca tedarikcisi.',
    city: 'İzmir',
    district: 'Karabağlar',
    address: 'Karabağlar Sanayi Sitesi, 14. Sokak',
    brands: ['BMW', 'Mercedes', 'Volvo'],
    models: ['E90', 'W204', 'S60', 'XC90'],
    partTypes: ['Süspansiyon', 'Direksiyon', 'Fren Sistemi'],
    specialties: ['Orijinal Parça', 'İthal Parça'],
    rating: 4.8,
    isActive: true,
    isFeatured: true,
    plan: 'premium',
    logoUrl: null,
    createdAt: new Date('2025-12-15T09:00:00.000Z'),
    updatedAt: new Date('2026-01-18T09:00:00.000Z'),
  },
  {
    id: 'dealer-6',
    name: 'Karadeniz Oto Parça',
    slug: 'karadeniz-oto-parca',
    phone: '+905399887766',
    whatsapp: '+905399887766',
    description: 'Samsun merkezli, yaygin marka ve modeller icin uygun fiyatli stok.',
    city: 'Samsun',
    district: 'İlkadım',
    address: 'İlkadım Oto Çarşı',
    brands: ['Toyota', 'Hyundai', 'Kia'],
    models: ['Corolla', 'Accent', 'Rio'],
    partTypes: ['Kaporta', 'Aydınlatma', 'İç Aksesuar'],
    specialties: ['Çıkma Parça'],
    rating: 3.9,
    isActive: true,
    isFeatured: false,
    plan: 'classic',
    logoUrl: null,
    createdAt: new Date('2025-12-20T09:00:00.000Z'),
    updatedAt: new Date('2026-01-20T09:00:00.000Z'),
  },
];

export const mockOffers = [
  {
    seller: 'Yılmaz BMW Çıkma',
    city: 'İstanbul',
    plan: 'premium' as const,
    condition: 'Orijinal',
    price: '12.500 TL',
    delivery: '2 iş günü',
    shipping: 'Kargo dahil',
    tags: ['Tavsiye Edilen', 'Fotoğraflı', 'Doğrulanmış Esnaf'],
  },
  {
    seller: 'Kardeşler Mercedes Parça',
    city: 'İstanbul',
    plan: 'premium' as const,
    condition: 'Çıkma',
    price: '8.900 TL',
    delivery: '1 iş günü',
    shipping: 'Kargo dahil',
    tags: ['En Uygun Fiyat', 'Hızlı Teslimat'],
  },
  {
    seller: 'VAG Grup Depo',
    city: 'İstanbul',
    plan: 'gold' as const,
    condition: 'Muadil',
    price: '6.200 TL',
    delivery: '3 iş günü',
    shipping: 'Alıcı öder',
    tags: ['OEM'],
  },
];

function rankPlanForSort(plan: string): number {
  if (plan === 'premium') return 3;
  if (plan === 'gold') return 2;
  return 1;
}

export function getFeaturedDealers(limit = 4): Dealer[] {
  return [...mockDealers]
    .filter((d) => d.isActive)
    .sort((a, b) => {
      const planDiff = rankPlanForSort(b.plan) - rankPlanForSort(a.plan);
      if (planDiff !== 0) return planDiff;
      return b.rating - a.rating;
    })
    .slice(0, limit);
}

export function getPublishedBlogPosts(filters: BlogFilters = {}): BlogPost[] {
  const { kategori, yazar } = filters;

  return mockBlogPosts
    .filter((post) => post.isPublished)
    .filter((post) => (kategori ? post.category === kategori : true))
    .filter((post) => (yazar ? post.author === yazar : true))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return mockBlogPosts.find((post) => post.slug === slug && post.isPublished);
}

export function getRelatedBlogPosts(post: BlogPost, take = 3): BlogPost[] {
  return mockBlogPosts
    .filter((candidate) => candidate.isPublished && candidate.id !== post.id)
    .filter((candidate) => candidate.category === post.category || candidate.author === post.author)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, take);
}

function rankPlan(plan: string): number {
  if (plan === 'premium') return 3;
  if (plan === 'gold') return 2;
  return 1;
}

export function getDealerBySlug(slug: string): Dealer | undefined {
  return mockDealers.find((dealer) => dealer.slug === slug && dealer.isActive);
}

export function getFilteredDealers(filters: DealerFilters = {}) {
  const {
    city,
    brand,
    partType,
    search,
    page = 1,
    limit = 12,
  } = filters;

  const normalizedSearch = search?.toLocaleLowerCase('tr-TR').trim();

  const filtered = mockDealers
    .filter((dealer) => dealer.isActive)
    .filter((dealer) => (city ? dealer.city === city : true))
    .filter((dealer) => (brand ? dealer.brands.includes(brand) : true))
    .filter((dealer) => (partType ? dealer.partTypes.includes(partType) : true))
    .filter((dealer) => {
      if (!normalizedSearch) return true;

      const haystack = [dealer.name, dealer.city, dealer.district]
        .join(' ')
        .toLocaleLowerCase('tr-TR');

      return haystack.includes(normalizedSearch);
    })
    .sort((a, b) => {
      const planDiff = rankPlan(b.plan) - rankPlan(a.plan);
      if (planDiff !== 0) return planDiff;
      if (a.isFeatured !== b.isFeatured) return a.isFeatured ? 1 : -1;
      return b.rating - a.rating;
    });

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const dealers = filtered.slice((page - 1) * limit, page * limit);

  return {
    dealers,
    total,
    totalPages,
  };
}
