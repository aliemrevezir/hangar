import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DealerForm from '@/components/admin/DealerForm';

export default async function NewDealerPage() {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Yeni Esnaf Ekle</h1>
      <DealerForm />
    </div>
  );
}
