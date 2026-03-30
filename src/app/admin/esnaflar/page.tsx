import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import DealerTable from '@/components/admin/DealerTable';
import Link from 'next/link';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default async function AdminDealersPage() {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  const dealers = await prisma.dealer.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Esnaflar</h1>
        <Link href="/admin/esnaflar/yeni">
          <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: '#6B3FA0' }}>
            Yeni Esnaf Ekle
          </Button>
        </Link>
      </div>
      <DealerTable dealers={dealers} />
    </div>
  );
}
