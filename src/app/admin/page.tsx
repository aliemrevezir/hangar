import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { Card } from 'antd';

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  const [totalDealers, activeDealers, featuredDealers, totalRequests, newRequests] = await Promise.all([
    prisma.dealer.count(),
    prisma.dealer.count({ where: { isActive: true } }),
    prisma.dealer.count({ where: { isFeatured: true } }),
    prisma.partRequest.count(),
    prisma.partRequest.count({ where: { status: 'new' } }),
  ]);

  const stats = [
    { label: 'Toplam Esnaf', value: totalDealers, color: '#6B3FA0' },
    { label: 'Aktif Esnaf', value: activeDealers, color: '#52c41a' },
    { label: 'Öne Çıkan', value: featuredDealers, color: '#faad14' },
    { label: 'Toplam Talep', value: totalRequests, color: '#1677ff' },
    { label: 'Yeni Talep', value: newRequests, color: '#ff4d4f' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-sm">
            <div className="text-sm text-gray-500">{stat.label}</div>
            <div className="text-3xl font-bold mt-1" style={{ color: stat.color }}>
              {stat.value}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
