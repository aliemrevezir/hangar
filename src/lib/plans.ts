export const PLAN_ORDER = { premium: 0, gold: 1, classic: 2 } as const;

export type PlanType = keyof typeof PLAN_ORDER;

export const PLANS = {
  classic: {
    name: 'Classic',
    price: '1.500',
    priceNum: 1500,
    color: '#8c8c8c',
    tagColor: 'default' as const,
    badge: null,
    description: 'Esnaf dizininde yer alın, temel profil sayfanızla müşterilere ulaşın.',
    features: [
      { text: 'Esnaf dizininde profil sayfası', included: true },
      { text: 'Telefon ve WhatsApp butonu', included: true },
      { text: 'Marka / model etiketleri', included: true },
      { text: 'Temel SEO görünürlüğü', included: true },
      { text: 'Parça talebi mesajları alma', included: false },
      { text: 'Öncelikli sıralama', included: false },
      { text: 'Öne çıkan rozeti', included: false },
    ],
  },
  gold: {
    name: 'Gold',
    price: '2.500',
    priceNum: 2500,
    color: '#d4a017',
    tagColor: 'gold' as const,
    badge: 'Popüler',
    description: 'Dizinde listeleme + parça talebi geldiğinde uzmanlık alanınıza göre mesaj alın.',
    features: [
      { text: 'Esnaf dizininde profil sayfası', included: true },
      { text: 'Telefon ve WhatsApp butonu', included: true },
      { text: 'Marka / model etiketleri', included: true },
      { text: 'Temel SEO görünürlüğü', included: true },
      { text: 'Parça talebi mesajları alma', included: true },
      { text: 'Öncelikli sıralama', included: false },
      { text: 'Öne çıkan rozeti', included: false },
    ],
  },
  premium: {
    name: 'Premium',
    price: '3.000',
    priceNum: 3000,
    color: '#6B3FA0',
    tagColor: 'purple' as const,
    badge: 'En Avantajlı',
    description: 'Hem dizinde hem talep listesinde en üst sırada, öne çıkan rozet ile maksimum görünürlük.',
    features: [
      { text: 'Esnaf dizininde profil sayfası', included: true },
      { text: 'Telefon ve WhatsApp butonu', included: true },
      { text: 'Marka / model etiketleri', included: true },
      { text: 'Temel SEO görünürlüğü', included: true },
      { text: 'Parça talebi mesajları alma', included: true },
      { text: 'Öncelikli sıralama', included: true },
      { text: 'Öne çıkan rozeti', included: true },
    ],
  },
} as const;
