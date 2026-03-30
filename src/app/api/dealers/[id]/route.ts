import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const dealer = await prisma.dealer.findUnique({ where: { id } });
  if (!dealer) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(dealer);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await request.json();
  const dealer = await prisma.dealer.update({ where: { id }, data });
  return NextResponse.json(dealer);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.dealer.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
