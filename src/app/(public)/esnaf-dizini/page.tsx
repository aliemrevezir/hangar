import { Suspense } from 'react';
import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';
import Container from '@/components/ui/Container';
import DealerCard from '@/components/directory/DealerCard';
import DealerFilters from '@/components/directory/DealerFilters';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Esnaf Dizini | Hangar',
  description: 'Yedek parça esnaflarını keşfet. Şehir, marka ve parça tipine göre filtrele.',
};

async function DealerList({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { city, brand, partType, search, page: pageStr } = searchParams;
  const page = parseInt(pageStr || '1');
  const limit = 12;

  const where: Prisma.DealerWhereInput = { isActive: true };
  if (city) where.city = city;
  if (brand) where.brands = { has: brand };
  if (partType) where.partTypes = { has: partType };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { city: { contains: search, mode: 'insensitive' } },
      { district: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [dealers, total] = await Promise.all([
    prisma.dealer.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: [{ plan: 'desc' }, { isFeatured: 'desc' }, { rating: 'desc' }],
    }),
    prisma.dealer.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  if (dealers.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">Aramanıza uygun esnaf bulunamadı.</p>
        <p className="text-gray-400 text-sm mt-2">Filtreleri değiştirmeyi deneyin.</p>
      </div>
    );
  }

  return (
    <>
      <div className="text-sm text-gray-500 mb-4">{total} esnaf bulundu</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dealers.map((dealer) => (
          <DealerCard key={dealer.id} dealer={dealer} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const params = new URLSearchParams();
            if (city) params.set('city', city);
            if (brand) params.set('brand', brand);
            if (partType) params.set('partType', partType);
            if (search) params.set('search', search);
            params.set('page', p.toString());
            return (
              <a
                key={p}
                href={`/esnaf-dizini?${params.toString()}`}
                className={`px-3 py-1.5 rounded text-sm ${
                  p === page
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {p}
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}

export default async function EsnafDiziniPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  return (
    <section className="py-8 lg:py-12 bg-gray-50 min-h-screen">
      <Container>
        <h1 className="text-3xl font-bold text-foreground mb-2">Esnaf Dizini</h1>
        <p className="text-gray-500 mb-6">
          Aradığınız yedek parça için uzman esnafları bulun.
        </p>

        <Suspense fallback={<div className="text-center py-8 text-gray-400">Yükleniyor...</div>}>
          <DealerFilters />
        </Suspense>

        <DealerList searchParams={params} />
      </Container>
    </section>
  );
}
