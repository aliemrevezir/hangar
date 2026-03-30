import { getSession } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import DealerForm from '@/components/admin/DealerForm';

export default async function EditDealerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  const { id } = await params;
  const dealer = await prisma.dealer.findUnique({ where: { id } });
  if (!dealer) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Esnaf Düzenle: {dealer.name}</h1>
      <DealerForm dealer={dealer} />
    </div>
  );
}
