'use server';

import { prisma } from '@/lib/db';
import { slugify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createBlogPost(formData: FormData) {
  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const author = formData.get('author') as string;
  const category = formData.get('category') as string;
  const tags = JSON.parse(formData.get('tags') as string || '[]');
  const isPublished = formData.get('isPublished') === 'true';

  await prisma.blogPost.create({
    data: {
      title,
      slug: slugify(title),
      excerpt,
      content,
      author,
      category,
      tags,
      isPublished,
    },
  });

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  redirect('/admin/blog');
}

export async function updateBlogPost(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const author = formData.get('author') as string;
  const category = formData.get('category') as string;
  const tags = JSON.parse(formData.get('tags') as string || '[]');
  const isPublished = formData.get('isPublished') === 'true';

  await prisma.blogPost.update({
    where: { id },
    data: {
      title,
      slug: slugify(title),
      excerpt,
      content,
      author,
      category,
      tags,
      isPublished,
    },
  });

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  redirect('/admin/blog');
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath('/blog');
  revalidatePath('/admin/blog');
}
