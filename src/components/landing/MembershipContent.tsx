'use client';

import { Card, Button, Tag, Table } from 'antd';
import { CheckOutlined, CloseOutlined, CrownOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { useSearchParams } from 'next/navigation';
import Container from '@/components/ui/Container';
import { PLANS } from '@/lib/plans';

const planKeys = ['classic', 'gold', 'premium'] as const;

const planIcons = {
  classic: <UserOutlined className="text-2xl" />,
  gold: <StarOutlined className="text-2xl" />,
  premium: <CrownOutlined className="text-2xl" />,
};

const comparisonData = [
  { feature: 'Esnaf dizininde profil', classic: true, gold: true, premium: true },
  { feature: 'Telefon & WhatsApp butonu', classic: true, gold: true, premium: true },
  { feature: 'Marka / model etiketleri', classic: true, gold: true, premium: true },
  { feature: 'SEO görünürlüğü', classic: 'Temel', gold: 'Gelişmiş', premium: 'Maksimum' },
  { feature: 'Parça talebi mesajları alma', classic: false, gold: true, premium: true },
  { feature: 'Talep sonuçlarında listeleme', classic: false, gold: true, premium: true },
  { feature: 'Esnaf dizininde öncelikli sıralama', classic: false, gold: false, premium: true },
  { feature: 'Talep sonuçlarında öncelikli sıralama', classic: false, gold: false, premium: true },
  { feature: 'Öne çıkan rozeti', classic: false, gold: false, premium: true },
  { feature: 'Haftalık performans raporu', classic: false, gold: true, premium: true },
];

export default function MembershipContent() {
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get('plan') || '';

  return (
    <section className="py-12 lg:py-20 bg-gray-50 min-h-screen">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Üyelik Paketleri</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            İşinize en uygun paketi seçin. Tüm paketler aylık abonelik ile çalışır,
            istediğiniz zaman yükseltme veya iptal edebilirsiniz.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {planKeys.map((key) => {
            const plan = PLANS[key];
            const isHighlight = key === 'premium';
            const isSelected = key === selectedPlan;

            return (
              <Card
                key={key}
                className={`relative transition-all hover:shadow-lg ${
                  isHighlight
                    ? 'border-2 border-primary shadow-lg scale-[1.03]'
                    : isSelected
                    ? 'border-2 border-primary/50 shadow-md'
                    : 'shadow-sm'
                }`}
              >
                {plan.badge && (
                  <Tag
                    color={plan.tagColor}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 font-medium px-3"
                  >
                    {plan.badge}
                  </Tag>
                )}

                <div className="text-center">
                  <div
                    className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${plan.color}15`, color: plan.color }}
                  >
                    {planIcons[key]}
                  </div>

                  <h3 className="text-xl font-bold mb-1" style={{ color: plan.color }}>
                    {plan.name}
                  </h3>

                  <div className="my-5">
                    <span className="text-5xl font-extrabold text-foreground">{plan.price}</span>
                    <span className="text-lg text-gray-400">₺</span>
                    <span className="text-sm text-gray-400 block mt-1">/ aylık</span>
                  </div>

                  <p className="text-sm text-gray-500 mb-6">{plan.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <div key={feature.text} className="flex items-center gap-2.5 text-sm">
                      {feature.included ? (
                        <CheckOutlined className="text-xs flex-shrink-0" style={{ color: plan.color }} />
                      ) : (
                        <CloseOutlined className="text-xs text-gray-300 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  type={isHighlight ? 'primary' : 'default'}
                  block
                  size="large"
                  style={isHighlight ? { backgroundColor: '#6B3FA0' } : {}}
                >
                  {plan.name} ile Başla
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Paket Karşılaştırma
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-medium text-gray-500 w-[40%]">
                      Özellik
                    </th>
                    {planKeys.map((key) => (
                      <th key={key} className="text-center py-4 px-4 w-[20%]">
                        <span className="font-bold" style={{ color: PLANS[key].color }}>
                          {PLANS[key].name}
                        </span>
                        <div className="text-xs text-gray-400 font-normal mt-0.5">
                          {PLANS[key].price}₺/ay
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={i % 2 === 0 ? 'bg-gray-50/50' : ''}
                    >
                      <td className="py-3.5 px-6 text-gray-700">{row.feature}</td>
                      {planKeys.map((key) => {
                        const val = row[key];
                        return (
                          <td key={key} className="text-center py-3.5 px-4">
                            {val === true ? (
                              <CheckOutlined style={{ color: PLANS[key].color }} />
                            ) : val === false ? (
                              <CloseOutlined className="text-gray-300" />
                            ) : (
                              <span className="text-xs font-medium" style={{ color: PLANS[key].color }}>
                                {val}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Sıkça Sorulan Sorular
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'Paketler arası fark ne?',
                a: 'Classic ile sadece esnaf dizininde profiliniz yer alır. Gold ile müşteriler parça talebi oluşturduğunda marka/model uzmanlığınıza göre mesaj alırsınız. Premium\'da ek olarak hem dizinde hem talep sonuçlarında en üst sırada görünürsünüz.',
              },
              {
                q: 'Parça talebi mesajları nasıl çalışıyor?',
                a: 'Müşteri araç bilgilerini ve ihtiyacı olan parçayı girer. Sistem, markaya ve parça tipine göre Gold ve Premium üyelerimizi eşleştirir. Müşteri WhatsApp ile direkt sizinle iletişime geçebilir.',
              },
              {
                q: 'Premium sıralaması nasıl işliyor?',
                a: 'Premium üyeler esnaf dizininde ve parça talebi sonuçlarında her zaman en üst sırada gösterilir. Ayrıca profillerinde "Öne Çıkan" rozeti yer alır.',
              },
              {
                q: 'Paket yükseltme yapabilir miyim?',
                a: 'Evet, istediğiniz zaman bir üst pakete geçebilirsiniz. Kalan süreniz yeni paketinize aktarılır.',
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
