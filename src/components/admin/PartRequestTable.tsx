'use client';

import { Table, Tag, Select, message } from 'antd';
import { updatePartRequestStatus } from '@/actions/part-request-actions';
import type { PartRequest } from '@prisma/client';

const statusMap: Record<string, { label: string; color: string }> = {
  new: { label: 'Yeni', color: 'blue' },
  matched: { label: 'Eşleştirildi', color: 'green' },
  closed: { label: 'Kapatıldı', color: 'default' },
};

export default function PartRequestTable({ requests }: { requests: PartRequest[] }) {
  const handleStatusChange = async (id: string, status: string) => {
    await updatePartRequestStatus(id, status);
    message.success('Durum güncellendi');
  };

  const columns = [
    {
      title: 'Tarih',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: Date) =>
        new Date(date).toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      width: 160,
    },
    {
      title: 'Müşteri',
      key: 'customer',
      render: (_: unknown, r: PartRequest) => (
        <div>
          <div className="font-medium text-sm">{r.customerName}</div>
          <div className="text-xs text-gray-400">{r.customerPhone}</div>
        </div>
      ),
    },
    {
      title: 'Araç',
      key: 'vehicle',
      render: (_: unknown, r: PartRequest) => (
        <div>
          <div className="font-medium text-sm">{r.brand} {r.model || ''}</div>
          {r.year && <div className="text-xs text-gray-400">{r.year}</div>}
        </div>
      ),
    },
    {
      title: 'Parça',
      key: 'part',
      render: (_: unknown, r: PartRequest) => (
        <div>
          <Tag color="blue" className="text-xs">{r.partType}</Tag>
          <div className="text-xs text-gray-500 mt-1 max-w-[200px] truncate">
            {r.partDetail}
          </div>
        </div>
      ),
    },
    {
      title: 'Şehir',
      dataIndex: 'city',
      key: 'city',
      render: (city: string | null) => city || '-',
    },
    {
      title: 'Durum',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: PartRequest) => (
        <Select
          value={status}
          size="small"
          onChange={(value) => handleStatusChange(record.id, value)}
          options={Object.entries(statusMap).map(([key, val]) => ({
            label: val.label,
            value: key,
          }))}
          style={{ width: 130 }}
        />
      ),
    },
  ];

  return (
    <Table
      dataSource={requests}
      columns={columns}
      rowKey="id"
      scroll={{ x: 800 }}
      pagination={{ pageSize: 20 }}
    />
  );
}
