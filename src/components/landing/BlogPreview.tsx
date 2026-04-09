'use client';

import { Card, Tag, Button } from 'antd';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { getPublishedBlogPosts } from '@/lib/mock-data';

const categoryLabels: Record<string, string> = {
  tavsiye: 'Tavsiye',
  rehber: 'Rehber',
  sponsorlu: 'Sponsorlu',
  haber: 'Haber',
};

const categoryColors: Record<string, string> = {
  tavsiye: 'blue',
  rehber: 'green',
  sponsorlu: 'orange',
  haber: 'purple',
};

const posts = getPublishedBlogPosts().slice(0, 3);

export default function BlogPreview() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Blog&apos;dan Seçmeler</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Yedek parça dünyasından güncel rehberler ve tavsiyeler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card
                className="h-full hover:shadow-lg transition-shadow cursor-pointer"
                styles={{ body: { padding: '20px' } }}
              >
                <Tag
                  color={categoryColors[post.category] || 'default'}
                  className="mb-3 text-[10px]"
                >
                  {categoryLabels[post.category] || post.category}
                </Tag>

                <h3 className="font-semibold text-foreground text-sm mb-2 line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{post.author}</span>
                  <span>{post.createdAt.toLocaleDateString('tr-TR')}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/blog">
            <Button type="default" size="large">
              Tüm Yazıları Gör
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
