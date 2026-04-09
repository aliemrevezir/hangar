'use client';

import { Tag, Card } from 'antd';
import { CarOutlined } from '@ant-design/icons';
import Container from '@/components/ui/Container';
import { mockOffers } from '@/lib/mock-data';

const tagColors: Record<string, string> = {
  'En Uygun Fiyat': 'green',
  'Tavsiye Edilen': 'purple',
  'Hızlı Teslimat': 'blue',
  'OEM': 'default',
  'Fotoğraflı': 'cyan',
  'Doğrulanmış Esnaf': 'gold',
};

export default function OfferComparison() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Teklifleri yan yana karşılaştırın
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Farklı esnaflardan gelen teklifleri tek tabloda görün. 20 esnafı aramak yerine, teklifler size gelsin.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Context label */}
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
            <CarOutlined />
            <span>BMW F30 — Sağ Far Komple — 2015</span>
          </div>

          <Card className="shadow-sm overflow-hidden" styles={{ body: { padding: 0 } }}>
            {/* Table header */}
            <div className="hidden sm:grid grid-cols-12 gap-3 px-5 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-3">Esnaf</div>
              <div className="col-span-2">Durum</div>
              <div className="col-span-2">Fiyat</div>
              <div className="col-span-2">Teslimat</div>
              <div className="col-span-3">Etiketler</div>
            </div>

            {/* Rows */}
            {mockOffers.map((offer, index) => (
              <div
                key={offer.seller}
                className={`grid grid-cols-1 sm:grid-cols-12 gap-3 px-5 py-4 items-center ${
                  index < mockOffers.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="sm:col-span-3">
                  <p className="font-medium text-foreground text-sm">{offer.seller}</p>
                  <p className="text-xs text-gray-400">{offer.city}</p>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-sm text-gray-700">{offer.condition}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-semibold text-foreground">{offer.price}</span>
                  <p className="text-xs text-gray-400">{offer.shipping}</p>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-sm text-gray-700">{offer.delivery}</span>
                </div>
                <div className="sm:col-span-3">
                  <div className="flex flex-wrap gap-1">
                    {offer.tags.map((tag) => (
                      <Tag key={tag} color={tagColors[tag] || 'default'} className="text-[10px] m-0">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </Container>
    </section>
  );
}
