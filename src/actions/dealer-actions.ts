'use server';

import { prisma } from '@/lib/db';
import { slugify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createDealer(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const whatsapp = formData.get('whatsapp') as string;
  const description = formData.get('description') as string;
  const city = formData.get('city') as string;
  const district = formData.get('district') as string;
  const address = formData.get('address') as string;
  const brands = JSON.parse(formData.get('brands') as string || '[]');
  const models = JSON.parse(formData.get('models') as string || '[]');
  const partTypes = JSON.parse(formData.get('partTypes') as string || '[]');
  const specialties = JSON.parse(formData.get('specialties') as string || '[]');
  const rating = parseFloat(formData.get('rating') as string || '0');
  const isActive = formData.get('isActive') === 'true';
  const isFeatured = formData.get('isFeatured') === 'true';
  const plan = (formData.get('plan') as string) || 'classic';

  await prisma.dealer.create({
    data: {
      name,
      slug: slugify(name),
      phone,
      whatsapp,
      description,
      city,
      district,
      address,
      brands,
      models,
      partTypes,
      specialties,
      rating,
      isActive,
      isFeatured,
      plan,
    },
  });

  revalidatePath('/esnaf-dizini');
  revalidatePath('/admin/esnaflar');
  redirect('/admin/esnaflar');
}

export async function updateDealer(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const whatsapp = formData.get('whatsapp') as string;
  const description = formData.get('description') as string;
  const city = formData.get('city') as string;
  const district = formData.get('district') as string;
  const address = formData.get('address') as string;
  const brands = JSON.parse(formData.get('brands') as string || '[]');
  const models = JSON.parse(formData.get('models') as string || '[]');
  const partTypes = JSON.parse(formData.get('partTypes') as string || '[]');
  const specialties = JSON.parse(formData.get('specialties') as string || '[]');
  const rating = parseFloat(formData.get('rating') as string || '0');
  const isActive = formData.get('isActive') === 'true';
  const isFeatured = formData.get('isFeatured') === 'true';
  const plan = (formData.get('plan') as string) || 'classic';

  await prisma.dealer.update({
    where: { id },
    data: {
      name,
      slug: slugify(name),
      phone,
      whatsapp,
      description,
      city,
      district,
      address,
      brands,
      models,
      partTypes,
      specialties,
      rating,
      isActive,
      isFeatured,
      plan,
    },
  });

  revalidatePath('/esnaf-dizini');
  revalidatePath('/admin/esnaflar');
  redirect('/admin/esnaflar');
}

export async function deleteDealer(id: string) {
  await prisma.dealer.delete({ where: { id } });
  revalidatePath('/esnaf-dizini');
  revalidatePath('/admin/esnaflar');
}
