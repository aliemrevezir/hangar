import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import PartRequestTable from '@/components/admin/PartRequestTable';

export default async function AdminRequestsPage() {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  const requests = await prisma.partRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Parça Talepleri</h1>
      <PartRequestTable requests={requests} />
    </div>
  );
}
