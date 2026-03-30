'use server';

import { prisma } from '@/lib/db';
import { compare } from 'bcryptjs';
import { createSession, destroySession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function login(_prevState: { error?: string } | null, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'E-posta ve şifre gerekli.' };
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) {
    return { error: 'Geçersiz e-posta veya şifre.' };
  }

  const valid = await compare(password, user.passwordHash);
  if (!valid) {
    return { error: 'Geçersiz e-posta veya şifre.' };
  }

  await createSession(user.id);
  redirect('/admin');
}

export async function logout() {
  await destroySession();
  redirect('/admin/login');
}
