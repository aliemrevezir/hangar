'use client';

import { Card, Tag, Rate } from 'antd';
import { EnvironmentOutlined, CrownOutlined } from '@ant-design/icons';
import Link from 'next/link';
import WhatsAppButton from './WhatsAppButton';
import { PLANS } from '@/lib/plans';
import type { PlanType } from '@/lib/plans';
import type { Dealer } from '@prisma/client';

export default function DealerCard({ dealer }: { dealer: Dealer }) {
  return (
    <Card
      hoverable
      className="shadow-sm h-full"
      styles={{ body: { display: 'flex', flexDirection: 'column', height: '100%' } }}
    >
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold text-sm">
                {dealer.name.charAt(0)}
              </span>
            </div>
            <div>
              <Link
                href={`/esnaf-dizini/${dealer.slug}`}
                className="font-semibold text-foreground hover:text-primary transition-colors"
              >
                {dealer.name}
              </Link>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <EnvironmentOutlined />
                {dealer.city}, {dealer.district}
              </div>
            </div>
          </div>
          {dealer.plan === 'premium' && (
            <Tag color="purple" className="text-xs" icon={<CrownOutlined />}>Premium</Tag>
          )}
          {dealer.plan === 'gold' && (
            <Tag color="gold" className="text-xs">Gold</Tag>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {dealer.brands.slice(0, 4).map((brand) => (
            <Tag key={brand} className="text-xs">{brand}</Tag>
          ))}
          {dealer.brands.length > 4 && (
            <Tag className="text-xs">+{dealer.brands.length - 4}</Tag>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {dealer.partTypes.slice(0, 3).map((pt) => (
            <Tag key={pt} color="blue" className="text-xs">{pt}</Tag>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Rate disabled defaultValue={dealer.rating} allowHalf className="text-sm" />
          <span className="text-sm text-gray-500">{dealer.rating.toFixed(1)}</span>
        </div>
      </div>

      <WhatsAppButton phone={dealer.whatsapp} block />
    </Card>
  );
}
