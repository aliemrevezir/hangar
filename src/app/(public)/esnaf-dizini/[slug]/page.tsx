import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import WhatsAppButton from '@/components/directory/WhatsAppButton';
import { formatPhone } from '@/lib/utils';
import { getDealerBySlug } from '@/lib/mock-data';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dealer = getDealerBySlug(slug);
  if (!dealer) return { title: 'Bulunamadı | Hangar' };
  return {
    title: `${dealer.name} | Hangar`,
    description: `${dealer.name} - ${dealer.city} ${dealer.district} bölgesinde ${dealer.brands.join(', ')} yedek parça esnafı.`,
  };
}

export default async function DealerDetailPage({ params }: Props) {
  const { slug } = await params;
  const dealer = getDealerBySlug(slug);
  if (!dealer) notFound();

  return (
    <section className="py-8 lg:py-12 bg-gray-50 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-dark to-primary p-8 text-white">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-bold">
                  {dealer.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{dealer.name}</h1>
                  <p className="text-white/80">
                    {dealer.city}, {dealer.district}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {dealer.description && (
                <p className="text-gray-600 mb-6">{dealer.description}</p>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Markalar</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {dealer.brands.map((brand) => (
                      <span key={brand} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {brand}
                      </span>
                    ))}
                  </div>

                  {dealer.models.length > 0 && (
                    <>
                      <h3 className="font-semibold text-foreground mb-3">Modeller</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {dealer.models.map((model) => (
                          <span key={model} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                            {model}
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                  <h3 className="font-semibold text-foreground mb-3">Parça Tipleri</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {dealer.partTypes.map((pt) => (
                      <span key={pt} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                        {pt}
                      </span>
                    ))}
                  </div>

                  {dealer.specialties.length > 0 && (
                    <>
                      <h3 className="font-semibold text-foreground mb-3">Uzmanlıklar</h3>
                      <div className="flex flex-wrap gap-2">
                        {dealer.specialties.map((spec) => (
                          <span key={spec} className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">İletişim</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <span className="text-lg">📞</span>
                      <span>{formatPhone(dealer.phone)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <span className="text-lg">📍</span>
                      <span>{dealer.city}, {dealer.district}</span>
                    </div>
                    {dealer.address && (
                      <div className="flex items-center gap-3 text-gray-600">
                        <span className="text-lg">🏠</span>
                        <span>{dealer.address}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-lg">⭐</span>
                    <span className="font-semibold text-lg">{dealer.rating.toFixed(1)}</span>
                    <span className="text-gray-400 text-sm">puan</span>
                  </div>

                  <WhatsAppButton phone={dealer.whatsapp} size="large" block />

                  <a
                    href={`tel:${dealer.phone}`}
                    className="mt-3 block w-full text-center py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    📞 Telefon ile Ara
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a href="/esnaf-dizini" className="text-primary hover:underline text-sm">
              ← Tüm Esnaflara Dön
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
