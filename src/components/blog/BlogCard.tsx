import { Tag } from 'antd';
import Link from 'next/link';
import type { BlogPost } from '@prisma/client';

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

export default function BlogCard({ post }: { post: BlogPost }) {
  const cat = categoryLabels[post.category] || categoryLabels.haber;
  const authorColor = authorColors[post.author] || '#6B3FA0';

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all h-full flex flex-col">
        {/* Color bar based on category */}
        <div className="h-1.5" style={{ backgroundColor: cat.color === 'blue' ? '#3b82f6' : cat.color === 'green' ? '#22c55e' : cat.color === 'orange' ? '#f97316' : '#a855f7' }} />

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Tag color={cat.color} className="text-xs m-0">{cat.label}</Tag>
            {post.category === 'sponsorlu' && (
              <span className="text-[10px] text-orange-500 font-medium">AD</span>
            )}
          </div>

          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
            {post.title}
          </h3>

          <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-1">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: authorColor }}
              >
                {post.author.charAt(0)}
              </div>
              <span className="text-xs text-gray-600 font-medium">{post.author}</span>
            </div>
            <span className="text-xs text-gray-400">
              {new Date(post.createdAt).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
