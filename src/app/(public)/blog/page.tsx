import { Suspense } from 'react';
import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';
import Container from '@/components/ui/Container';
import BlogCard from '@/components/blog/BlogCard';
import BlogFilters from '@/components/blog/BlogFilters';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & SEO | Hangar',
  description: 'Oto yedek parça dünyasından haberler, rehberler, tavsiyeler ve uzman görüşleri.',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; yazar?: string }>;
}) {
  const { kategori, yazar } = await searchParams;

  const where: Prisma.BlogPostWhereInput = { isPublished: true };
  if (kategori) where.category = kategori;
  if (yazar) where.author = yazar;

  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <section className="py-8 lg:py-12 bg-gray-50 min-h-screen">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Blog & SEO</h1>
            <p className="text-gray-500">
              Oto yedek parça dünyasından haberler, rehberler ve uzman tavsiyeleri.
            </p>
          </div>

          <Suspense fallback={<div />}>
            <BlogFilters />
          </Suspense>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Bu filtreye uygun yazı bulunamadı.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
