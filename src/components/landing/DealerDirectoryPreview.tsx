'use client';

import { Card, Tag, Button, Rate } from 'antd';
import { WhatsAppOutlined, PhoneOutlined } from '@ant-design/icons';
import Container from '@/components/ui/Container';

const sampleDealers = [
  {
    name: 'Ankara BMW Çıkma',
    description: 'BMW / Mini · Son gönderim 8 dk önce',
    brands: ['Standart', 'Kargo Var', 'K/S | B/H'],
    price: 'Aylık 2.000 TL',
    rating: 4.5,
  },
  {
    name: 'Yıldız Mercedes Oto',
    description: 'İstanbul · W204 / W212 / Sprinter',
    brands: ['Standart', 'Aynı Gün Dönüş', 'Kaporta'],
    price: 'Aylık 1.000 TL',
    rating: 4.2,
  },
  {
    name: 'VAG Group Depot',
    description: 'İstanbul · Audi / VW / Skoda / Seat',
    brands: ['Başlangıç', 'OEM Kod', 'Elektronik'],
    price: 'Aylık 500 TL',
    rating: 4.0,
  },
];

export default function DealerDirectoryPreview() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Esnaf dizini nasıl görünmeli?
            </h2>
            <p className="text-gray-500 mb-8">
              Buradaki esnaf sadece isim yazanlar değil; her dükkânda geçişleri dijital bir vitrin
              vermek. Konum, marka uzmanlığı, WhatsApp, son ürünler, puan ve üyelik modeli
              net görünsün.
            </p>

            <div className="space-y-4">
              {sampleDealers.map((dealer) => (
                <Card key={dealer.name} size="small" className="shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary text-xs font-bold">
                            {dealer.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{dealer.name}</h4>
                          <p className="text-xs text-gray-400">{dealer.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {dealer.brands.map((brand) => (
                          <Tag key={brand} className="text-xs">{brand}</Tag>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <Rate disabled defaultValue={dealer.rating} allowHalf className="text-xs" />
                      <div className="text-sm font-medium text-primary mt-1">{dealer.price}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Parça talebi tarafı
            </h2>
            <p className="text-gray-500 mb-8">
              Kullanıcı tarafından doldurulan talep formu sade olmalı ama size yeterli bilgi
              parçaya ulaşma vermelidir.
            </p>

            <div className="space-y-4">
              <Card size="small" className="shadow-sm border-l-4 border-l-primary">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-lg">
                    🚗
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Şasi no veya araç bilgisi</h4>
                    <p className="text-xs text-gray-400">VIN, marka-model, motor kodu, yıl.</p>
                  </div>
                </div>
              </Card>

              <Card size="small" className="shadow-sm border-l-4 border-l-primary">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-lg">
                    🔧
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">İstenen parça</h4>
                    <p className="text-xs text-gray-400">Parça adı, OEM kodu, sağ-sol gibi detaylar, fotoğraf ekleme.</p>
                  </div>
                </div>
              </Card>

              <Card size="small" className="shadow-sm border-l-4 border-l-primary">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-lg">
                    ⚙️
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Operasyon filtresi</h4>
                    <p className="text-xs text-gray-400">Parça tipi seçimi, uygun olan ve o markada parçan bulunan esnaf.</p>
                  </div>
                </div>
              </Card>

              <Card size="small" className="shadow-sm border-l-4 border-l-primary">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-lg">
                    💰
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Teklif toplama ekranı</h4>
                    <p className="text-xs text-gray-400">Esnaf fiyat verir, stok / katte / kargo / teslim süresi girer.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
