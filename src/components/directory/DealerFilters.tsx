'use client';

import { Select, Input, Button } from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { CITIES, BRANDS, PART_TYPES } from '@/lib/constants';

export default function DealerFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');
    router.push(`/esnaf-dizini?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/esnaf-dizini');
  };

  const hasFilters = searchParams.toString().length > 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <Input
          placeholder="Esnaf ara..."
          prefix={<SearchOutlined />}
          defaultValue={searchParams.get('search') || ''}
          allowClear
          onChange={(e) => {
            const value = e.target.value;
            if (!value) updateFilter('search', null);
          }}
          onPressEnter={(e) => updateFilter('search', (e.target as HTMLInputElement).value || null)}
        />

        <Select
          placeholder="Şehir seçin"
          allowClear
          value={searchParams.get('city') || undefined}
          onChange={(value) => updateFilter('city', value || null)}
          options={CITIES.map((c) => ({ label: c, value: c }))}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />

        <Select
          placeholder="Marka seçin"
          allowClear
          value={searchParams.get('brand') || undefined}
          onChange={(value) => updateFilter('brand', value || null)}
          options={BRANDS.map((b) => ({ label: b, value: b }))}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />

        <Select
          placeholder="Parça tipi"
          allowClear
          value={searchParams.get('partType') || undefined}
          onChange={(value) => updateFilter('partType', value || null)}
          options={PART_TYPES.map((p) => ({ label: p, value: p }))}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />

        {hasFilters && (
          <Button icon={<ClearOutlined />} onClick={clearFilters}>
            Temizle
          </Button>
        )}
      </div>
    </div>
  );
}
