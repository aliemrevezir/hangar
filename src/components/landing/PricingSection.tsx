'use client';

import { Card, Button, Tag } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { PLANS } from '@/lib/plans';

const planKeys = ['classic', 'gold', 'premium'] as const;

export default function PricingSection() {
  return (
    <section id="paketler" className="py-16 lg:py-24 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Üyelik Paketleri</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            İhtiyacınıza uygun paketi seçin. Classic ile dizinde yer alın, Gold ile parça
            taleplerini alın, Premium ile her yerde öne çıkın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {planKeys.map((key) => {
            const plan = PLANS[key];
            const isHighlight = key === 'premium';

            return (
              <Card
                key={key}
                className={`relative transition-all hover:shadow-lg ${
                  isHighlight
                    ? 'border-2 border-primary shadow-md scale-[1.02]'
                    : 'shadow-sm'
                }`}
              >
                {plan.badge && (
                  <Tag
                    color={plan.tagColor}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 font-medium"
                  >
                    {plan.badge}
                  </Tag>
                )}

                <div className="text-center">
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: plan.color }}
                  >
                    {plan.name}
                  </h3>

                  <div className="my-5">
                    <span className="text-4xl font-extrabold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-lg text-gray-400">₺</span>
                    <span className="text-sm text-gray-400 block mt-1">/ aylık</span>
                  </div>

                  <p className="text-sm text-gray-500 mb-6 min-h-[48px]">
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <div key={feature.text} className="flex items-center gap-2.5 text-sm">
                      {feature.included ? (
                        <CheckOutlined
                          className="text-xs flex-shrink-0"
                          style={{ color: plan.color }}
                        />
                      ) : (
                        <CloseOutlined className="text-xs text-gray-300 flex-shrink-0" />
                      )}
                      <span
                        className={feature.included ? 'text-gray-700' : 'text-gray-400'}
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Link href={`/uyelik-paketleri?plan=${key}`}>
                  <Button
                    type={isHighlight ? 'primary' : 'default'}
                    block
                    size="large"
                    style={isHighlight ? { backgroundColor: '#6B3FA0' } : {}}
                  >
                    {plan.name} Seç
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
