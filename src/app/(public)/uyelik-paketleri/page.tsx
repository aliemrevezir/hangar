import { Suspense } from 'react';
import Container from '@/components/ui/Container';
import MembershipContent from '@/components/landing/MembershipContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Üyelik Paketleri | Hangar',
  description: 'Classic, Gold ve Premium üyelik paketleri. Esnaf dizininde yer alın, parça taleplerinden mesaj alın.',
};

export default function MembershipPage() {
  return (
    <Suspense fallback={
      <div className="py-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400">Yükleniyor...</div>
      </div>
    }>
      <MembershipContent />
    </Suspense>
  );
}
