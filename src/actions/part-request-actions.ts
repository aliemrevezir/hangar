'use server';

import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createPartRequest(formData: FormData) {
  const customerName = formData.get('customerName') as string;
  const customerPhone = formData.get('customerPhone') as string;
  const brand = formData.get('brand') as string;
  const model = (formData.get('model') as string) || null;
  const yearStr = formData.get('year') as string;
  const year = yearStr ? parseInt(yearStr) : null;
  const partType = formData.get('partType') as string;
  const partDetail = formData.get('partDetail') as string;
  const city = (formData.get('city') as string) || null;

  const request = await prisma.partRequest.create({
    data: {
      customerName,
      customerPhone,
      brand,
      model,
      year,
      partType,
      partDetail,
      city,
    },
  });

  revalidatePath('/admin');
  redirect(`/parca-talebi/sonuc?id=${request.id}`);
}

export async function updatePartRequestStatus(id: string, status: string) {
  await prisma.partRequest.update({
    where: { id },
    data: { status },
  });
  revalidatePath('/admin');
  revalidatePath('/admin/talepler');
}
