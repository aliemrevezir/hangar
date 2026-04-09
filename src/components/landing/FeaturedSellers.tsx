'use client';

import { Card, Tag, Button, Rate } from 'antd';
import { WhatsAppOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { getFeaturedDealers } from '@/lib/mock-data';
import { PLANS } from '@/lib/plans';
import type { PlanType } from '@/lib/plans';

const dealers = getFeaturedDealers(4);

export default function FeaturedSellers() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Öne Çıkan Esnaflar</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Platformumuzdaki güvenilir ve doğrulanmış yedek parça esnafları.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {dealers.map((dealer) => {
            const plan = PLANS[dealer.plan as PlanType];
            return (
              <Link key={dealer.id} href={`/esnaf-dizini/${dealer.slug}`}>
                <Card
                  className="h-full hover:shadow-lg transition-shadow cursor-pointer"
                  styles={{ body: { padding: '20px' } }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm leading-tight">
                        {dealer.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {dealer.city}{dealer.district ? ` / ${dealer.district}` : ''}
                      </p>
                    </div>
                    {dealer.plan !== 'classic' && (
                      <Tag color={plan.tagColor} className="text-[10px] ml-1 flex-shrink-0">
                        {plan.name}
                      </Tag>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {dealer.brands.slice(0, 3).map((brand) => (
                      <Tag key={brand} className="text-[10px] m-0">{brand}</Tag>
                    ))}
                    {dealer.brands.length > 3 && (
                      <Tag className="text-[10px] m-0">+{dealer.brands.length - 3}</Tag>
                    )}
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <Rate disabled defaultValue={dealer.rating} allowHalf className="text-xs" />
                    <span className="text-xs text-gray-400">{dealer.rating}</span>
                  </div>

                  {dealer.isFeatured && (
                    <div className="flex items-center gap-1 text-[10px] text-primary mb-3">
                      <SafetyCertificateOutlined />
                      <span>Doğrulanmış</span>
                    </div>
                  )}

                  <Button
                    size="small"
                    icon={<WhatsAppOutlined />}
                    className="w-full text-xs"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(`https://wa.me/${dealer.whatsapp?.replace(/[^0-9]/g, '')}`, '_blank');
                    }}
                  >
                    WhatsApp
                  </Button>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/esnaf-dizini">
            <Button type="default" size="large">
              Tüm Esnafları Gör
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
