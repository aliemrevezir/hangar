'use client';

import { Table, Tag, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { deleteDealer } from '@/actions/dealer-actions';
import type { Dealer } from '@prisma/client';

export default function DealerTable({ dealers }: { dealers: Dealer[] }) {
  const handleDelete = async (id: string) => {
    await deleteDealer(id);
    message.success('Esnaf silindi');
  };

  const columns = [
    {
      title: 'Esnaf Adı',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Dealer) => (
        <Link href={`/esnaf-dizini/${record.slug}`} className="text-primary hover:underline font-medium">
          {name}
        </Link>
      ),
    },
    {
      title: 'Şehir',
      key: 'location',
      render: (_: unknown, record: Dealer) => `${record.city}, ${record.district}`,
    },
    {
      title: 'Markalar',
      dataIndex: 'brands',
      key: 'brands',
      render: (brands: string[]) => (
        <div className="flex flex-wrap gap-1">
          {brands.slice(0, 3).map((b) => <Tag key={b} className="text-xs">{b}</Tag>)}
          {brands.length > 3 && <Tag className="text-xs">+{brands.length - 3}</Tag>}
        </div>
      ),
    },
    {
      title: 'Puan',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => rating.toFixed(1),
      sorter: (a: Dealer, b: Dealer) => a.rating - b.rating,
    },
    {
      title: 'Paket',
      dataIndex: 'plan',
      key: 'plan',
      render: (plan: string) => {
        const map: Record<string, { label: string; color: string }> = {
          classic: { label: 'Classic', color: 'default' },
          gold: { label: 'Gold', color: 'gold' },
          premium: { label: 'Premium', color: 'purple' },
        };
        const p = map[plan] || map.classic;
        return <Tag color={p.color}>{p.label}</Tag>;
      },
      filters: [
        { text: 'Classic', value: 'classic' },
        { text: 'Gold', value: 'gold' },
        { text: 'Premium', value: 'premium' },
      ],
      onFilter: (value: unknown, record: Dealer) => record.plan === value,
    },
    {
      title: 'Durum',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (active: boolean) => (
        <Tag color={active ? 'green' : 'default'}>{active ? 'Aktif' : 'Pasif'}</Tag>
      ),
    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_: unknown, record: Dealer) => (
        <div className="flex gap-2">
          <Link href={`/admin/esnaflar/${record.id}/duzenle`}>
            <Button size="small" icon={<EditOutlined />}>Düzenle</Button>
          </Link>
          <Popconfirm
            title="Bu esnafı silmek istediğinize emin misiniz?"
            onConfirm={() => handleDelete(record.id)}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button size="small" danger icon={<DeleteOutlined />}>Sil</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={dealers}
      columns={columns}
      rowKey="id"
      scroll={{ x: 800 }}
      pagination={{ pageSize: 20 }}
    />
  );
}
