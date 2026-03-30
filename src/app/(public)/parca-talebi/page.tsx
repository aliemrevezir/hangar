import { Suspense } from 'react';
import PartRequestForm from '@/components/directory/PartRequestForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Parça Talebi Oluştur | Hangar',
  description: 'Araç bilgilerinizi girin, size uygun yedek parça esnaflarını bulalım.',
};

export default function PartRequestPage() {
  return (
    <Suspense fallback={
      <div className="py-8 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400">Yükleniyor...</div>
      </div>
    }>
      <PartRequestForm />
    </Suspense>
  );
}
