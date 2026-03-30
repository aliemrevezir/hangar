'use client';

import { Table, Tag, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { deleteBlogPost } from '@/actions/blog-actions';
import type { BlogPost } from '@prisma/client';

const categoryMap: Record<string, { label: string; color: string }> = {
  tavsiye: { label: 'Tavsiye', color: 'blue' },
  rehber: { label: 'Rehber', color: 'green' },
  sponsorlu: { label: 'Sponsorlu', color: 'orange' },
  haber: { label: 'Haber', color: 'purple' },
};

export default function BlogPostTable({ posts }: { posts: BlogPost[] }) {
  const handleDelete = async (id: string) => {
    await deleteBlogPost(id);
    message.success('Yazı silindi');
  };

  const columns = [
    {
      title: 'Başlık',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: BlogPost) => (
        <Link href={`/blog/${record.slug}`} className="text-primary hover:underline font-medium text-sm">
          {title}
        </Link>
      ),
    },
    {
      title: 'Yazar',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
      render: (cat: string) => {
        const c = categoryMap[cat] || categoryMap.haber;
        return <Tag color={c.color}>{c.label}</Tag>;
      },
      filters: Object.entries(categoryMap).map(([k, v]) => ({ text: v.label, value: k })),
      onFilter: (value: unknown, record: BlogPost) => record.category === value,
    },
    {
      title: 'Durum',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (published: boolean) => (
        <Tag color={published ? 'green' : 'default'}>{published ? 'Yayında' : 'Taslak'}</Tag>
      ),
    },
    {
      title: 'Tarih',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: Date) =>
        new Date(date).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_: unknown, record: BlogPost) => (
        <div className="flex gap-2">
          <Link href={`/admin/blog/${record.id}/duzenle`}>
            <Button size="small" icon={<EditOutlined />}>Düzenle</Button>
          </Link>
          <Popconfirm
            title="Bu yazıyı silmek istediğinize emin misiniz?"
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
      dataSource={posts}
      columns={columns}
      rowKey="id"
      scroll={{ x: 800 }}
      pagination={{ pageSize: 20 }}
    />
  );
}
