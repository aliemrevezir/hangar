import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import BlogCard from '@/components/blog/BlogCard';
import { Tag } from 'antd';
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/mock-data';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

const categoryLabels: Record<string, { label: string; color: string }> = {
  tavsiye: { label: 'Tavsiye', color: 'blue' },
  rehber: { label: 'Rehber', color: 'green' },
  sponsorlu: { label: 'Sponsorlu', color: 'orange' },
  haber: { label: 'Haber', color: 'purple' },
};

const authorColors: Record<string, string> = {
  'Doğan Kabak': '#e74c3c',
  'Ünal Turan': '#2980b9',
  'Tunç Mete': '#f39c12',
  'Selin Yıldırım': '#8e44ad',
  'Kuzen Emre': '#27ae60',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Bulunamadı | Hangar' };
  return {
    title: `${post.title} | Hangar Blog`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const cat = categoryLabels[post.category] || categoryLabels.haber;
  const authorColor = authorColors[post.author] || '#6B3FA0';

  // İlgili yazılar: aynı kategori veya aynı yazar
  const relatedPosts = getRelatedBlogPosts(post, 3);

  return (
    <section className="py-8 lg:py-12 bg-gray-50 min-h-screen">
      <Container>
        <article className="max-w-3xl mx-auto">
          {/* Sponsorlu uyarı */}
          {post.category === 'sponsorlu' && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 flex items-center gap-3">
              <span className="text-orange-500 text-xl">📢</span>
              <div>
                <span className="font-semibold text-orange-700 text-sm">Sponsorlu İçerik</span>
                <p className="text-xs text-orange-600">
                  Bu içerik sponsorluk kapsamında hazırlanmıştır. Hangar editoryal bağımsızlığını korur.
                </p>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="p-8 lg:p-10">
              <div className="flex items-center gap-2 mb-4">
                <Tag color={cat.color}>{cat.label}</Tag>
                <span className="text-sm text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
                {post.title}
              </h1>

              <p className="text-lg text-gray-500 mb-6">{post.excerpt}</p>

              <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: authorColor }}
                >
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">{post.author}</div>
                  <div className="text-xs text-gray-400">Yazar</div>
                </div>
              </div>

              {/* Content */}
              <div className="mt-8 prose-custom">
                {post.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-4 text-[15px]">
                    {paragraph.split('\n').map((line, j) => (
                      <span key={j}>
                        {line}
                        {j < paragraph.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                ))}
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary-dark to-primary rounded-xl p-6 mb-8 text-center">
            <h3 className="text-white font-bold text-lg mb-2">Parça mı arıyorsunuz?</h3>
            <p className="text-white/70 text-sm mb-4">
              Hangar ile aradığınız parçayı şak diye bulun.
            </p>
            <a
              href="/parca-talebi"
              className="inline-block px-6 py-2.5 bg-white text-primary font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Parça Talebi Oluştur
            </a>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">İlgili Yazılar</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((rp) => (
                  <BlogCard key={rp.id} post={rp} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/blog" className="text-primary hover:underline text-sm">
              ← Tüm Yazılara Dön
            </Link>
          </div>
        </article>
      </Container>
    </section>
  );
}
