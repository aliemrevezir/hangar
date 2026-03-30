import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const brand = searchParams.get('brand');
  const partType = searchParams.get('partType');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');

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

  return NextResponse.json({ dealers, total, page, totalPages: Math.ceil(total / limit) });
}
