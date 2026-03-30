import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';
import Container from '@/components/ui/Container';
import MatchedDealerCard from '@/components/directory/MatchedDealerCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Talep Sonucu | Hangar',
  description: 'Parça talebinize uygun esnaflar.',
};

export default async function PartRequestResultPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  if (!id) notFound();

  const request = await prisma.partRequest.findUnique({ where: { id } });
  if (!request) notFound();

  // Uygun esnafları bul: marka eşleşmesi + parça tipi + (varsa) şehir
  // Sadece gold ve premium esnaflar talep sonuçlarında görünür (classic sadece dizinde listelenir)
  const where: Prisma.DealerWhereInput = {
    isActive: true,
    brands: { has: request.brand },
    plan: { in: ['gold', 'premium'] },
  };

  // Parça tipi eşleşmesi varsa filtrele
  if (request.partType) {
    where.partTypes = { has: request.partType };
  }

  // Önce aynı şehirden esnafları, sonra diğerlerini getir
  // Premium esnaflar her zaman üstte
  const [localDealers, otherDealers] = await Promise.all([
    request.city
      ? prisma.dealer.findMany({
          where: { ...where, city: request.city },
          orderBy: [{ plan: 'desc' }, { rating: 'desc' }],
        })
      : Promise.resolve([]),
    prisma.dealer.findMany({
      where: {
        ...where,
        ...(request.city ? { city: { not: request.city } } : {}),
      },
      orderBy: [{ plan: 'desc' }, { rating: 'desc' }],
      take: 20,
    }),
  ]);

  const allDealers = [...localDealers, ...otherDealers];

  // WhatsApp mesajı için talep detayını hazırla
  const whatsappMessage = [
    `Merhaba, Hangar üzerinden ulaşıyorum.`,
    ``,
    `Araç: ${request.brand}${request.model ? ` ${request.model}` : ''}${request.year ? ` (${request.year})` : ''}`,
    `İstenen Parça: ${request.partType}`,
    `Detay: ${request.partDetail}`,
  ].join('\n');

  return (
    <section className="py-8 lg:py-12 bg-gray-50 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Talep Özeti */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-lg">
                ✓
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Talebiniz oluşturuldu!</h1>
                <p className="text-sm text-gray-500">
                  Aşağıda araç ve parça bilgilerinize uygun esnaflar listeleniyor.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 rounded-xl p-4">
              <div>
                <div className="text-xs text-gray-400">Marka</div>
                <div className="font-semibold text-sm">{request.brand}</div>
              </div>
              {request.model && (
                <div>
                  <div className="text-xs text-gray-400">Model</div>
                  <div className="font-semibold text-sm">{request.model}</div>
                </div>
              )}
              {request.year && (
                <div>
                  <div className="text-xs text-gray-400">Yıl</div>
                  <div className="font-semibold text-sm">{request.year}</div>
                </div>
              )}
              <div>
                <div className="text-xs text-gray-400">Parça</div>
                <div className="font-semibold text-sm">{request.partType}</div>
              </div>
            </div>

            <div className="mt-3 bg-gray-50 rounded-xl p-4">
              <div className="text-xs text-gray-400 mb-1">Detay</div>
              <div className="text-sm text-gray-700">{request.partDetail}</div>
            </div>
          </div>

          {/* Eşleşen Esnaflar */}
          <h2 className="text-xl font-bold text-foreground mb-2">
            Uygun Esnaflar ({allDealers.length})
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {request.brand} markasında uzman esnaflar. WhatsApp ile doğrudan iletişime geçebilirsiniz.
          </p>

          {allDealers.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-lg mb-2">Şu an uygun esnaf bulunamadı.</p>
              <p className="text-gray-400 text-sm">
                Tüm esnafları görmek için{' '}
                <a href="/esnaf-dizini" className="text-primary hover:underline">
                  esnaf dizinini
                </a>{' '}
                ziyaret edin.
              </p>
            </div>
          ) : (
            <>
              {localDealers.length > 0 && request.city && (
                <div className="text-sm font-medium text-primary mb-3">
                  📍 {request.city} bölgesindeki esnaflar
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {localDealers.map((dealer) => (
                  <MatchedDealerCard
                    key={dealer.id}
                    dealer={dealer}
                    whatsappMessage={whatsappMessage}
                    isLocal
                  />
                ))}
              </div>

              {otherDealers.length > 0 && localDealers.length > 0 && (
                <div className="text-sm font-medium text-gray-500 mb-3 mt-8">
                  🚚 Diğer şehirlerdeki esnaflar
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {otherDealers.map((dealer) => (
                  <MatchedDealerCard
                    key={dealer.id}
                    dealer={dealer}
                    whatsappMessage={whatsappMessage}
                  />
                ))}
              </div>
            </>
          )}

          <div className="mt-8 text-center space-x-4">
            <a
              href="/parca-talebi"
              className="text-primary hover:underline text-sm"
            >
              ← Yeni Talep Oluştur
            </a>
            <a
              href="/esnaf-dizini"
              className="text-gray-500 hover:underline text-sm"
            >
              Tüm Esnafları Gör
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
