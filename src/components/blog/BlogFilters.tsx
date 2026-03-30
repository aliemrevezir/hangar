'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const categories = [
  { key: '', label: 'Tümü' },
  { key: 'tavsiye', label: 'Tavsiye' },
  { key: 'rehber', label: 'Rehber' },
  { key: 'sponsorlu', label: 'Sponsorlu' },
  { key: 'haber', label: 'Haber' },
];

const authors = ['Doğan Kabak', 'Ünal Turan', 'Tunç Mete', 'Selin Yıldırım', 'Kuzen Emre'];

export default function BlogFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('kategori') || '';
  const currentAuthor = searchParams.get('yazar') || '';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="mb-8">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => updateFilter('kategori', cat.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              currentCategory === cat.key
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Author pills */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-gray-400 py-1">Yazar:</span>
        {currentAuthor && (
          <button
            onClick={() => updateFilter('yazar', '')}
            className="px-3 py-1 rounded-full text-xs bg-red-50 text-red-500 hover:bg-red-100"
          >
            Temizle
          </button>
        )}
        {authors.map((author) => (
          <button
            key={author}
            onClick={() => updateFilter('yazar', author)}
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              currentAuthor === author
                ? 'bg-primary/10 text-primary font-medium'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            {author}
          </button>
        ))}
      </div>
    </div>
  );
}
