'use client';

import { Card, Tag, Rate, Button } from 'antd';
import { WhatsAppOutlined, EnvironmentOutlined, PhoneOutlined, CrownOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { buildWhatsAppUrl } from '@/lib/utils';
import type { Dealer } from '@prisma/client';

export default function MatchedDealerCard({
  dealer,
  whatsappMessage,
  isLocal = false,
}: {
  dealer: Dealer;
  whatsappMessage: string;
  isLocal?: boolean;
}) {
  return (
    <Card
      className={`shadow-sm ${isLocal ? 'border-primary/30 bg-primary/[0.02]' : ''}`}
      styles={{ body: { padding: '16px' } }}
    >
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
              className="font-semibold text-sm text-foreground hover:text-primary transition-colors"
            >
              {dealer.name}
            </Link>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <EnvironmentOutlined />
              {dealer.city}, {dealer.district}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          {dealer.plan === 'premium' && <Tag color="purple" className="text-xs m-0" icon={<CrownOutlined />}>Premium</Tag>}
          {dealer.plan === 'gold' && <Tag color="gold" className="text-xs m-0">Gold</Tag>}
          {isLocal && <Tag color="green" className="text-xs m-0">Yakın</Tag>}
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-2">
        {dealer.brands.slice(0, 3).map((brand) => (
          <Tag key={brand} className="text-xs">{brand}</Tag>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Rate disabled defaultValue={dealer.rating} allowHalf className="text-xs" />
        <span className="text-xs text-gray-500">{dealer.rating.toFixed(1)}</span>
      </div>

      <div className="flex gap-2">
        <Button
          type="primary"
          icon={<WhatsAppOutlined />}
          block
          href={buildWhatsAppUrl(dealer.whatsapp, whatsappMessage)}
          target="_blank"
          style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
        >
          WhatsApp ile Sor
        </Button>
        <Button
          icon={<PhoneOutlined />}
          href={`tel:${dealer.phone}`}
        />
      </div>
    </Card>
  );
}
