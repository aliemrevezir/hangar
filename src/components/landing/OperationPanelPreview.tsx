'use client';

import { Card, Tag } from 'antd';
import Container from '@/components/ui/Container';

export default function OperationPanelPreview() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Senin operasyon panelin
            </h2>
            <p className="text-gray-500 mb-8">
              Asıl değer burada. Talepleri tek ekranda alırsın, hangi esnafa gittiği görülür, kim
              seçerek verdiği talep edilir.
            </p>

            <Card className="shadow-sm">
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="text-gray-500">Yeni talep</div>
                  <div className="font-bold text-lg">3</div>
                  <div className="text-xs text-gray-400">BMW F30 sağ far</div>
                  <div className="text-xs text-gray-400">Ankara · 00:48</div>
                </div>
                <div>
                  <div className="text-gray-500">Gönderilen esnaf</div>
                  <div className="font-bold text-lg">5</div>
                  <div className="text-xs text-gray-400">8 mağaza · 3</div>
                  <div className="text-xs text-gray-400">Premium · 2</div>
                </div>
                <div>
                  <div className="text-gray-500">Beklenen dönüş</div>
                  <div className="font-bold text-lg">2</div>
                  <div className="text-xs text-gray-400">16 dk ortalama ·</div>
                  <div className="text-xs text-gray-400">teklif bvledi</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Durum akışı</span>
                  <Tag color="blue">Aktif</Tag>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Talep düştü → Esnaflara iletildi → Teklifler düştü → Müşteriye çıktı hazırlandı.
                </p>
              </div>
            </Card>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Müşteriye gidecek fiyat listesi
            </h2>
            <p className="text-gray-500 mb-8">
              Talep toplandıktan sonra müşteriye düzgün değil, güven veren karşılaştırılabilir bir liste çıkmalı.
            </p>

            <Card className="shadow-sm">
              <div className="space-y-4">
                {[
                  { name: 'Ankara BMW Çıkma', detail: 'Orijinal sağ far · Test edildi', price: '12.500 TL', delivery: '2 gün teslimat', tag: 'En iyi seçim' },
                  { name: 'Yıldız Oto', detail: 'Uslu çıkış var · Fotoğraf', price: '10.900 TL', delivery: '3 gün teslimat', tag: null },
                  { name: 'VAG Group Depot', detail: 'Muadilen alternatif parça', price: '14.200 TL', delivery: '5 gün teslimat', tag: 'Hızlı stok' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-gray-400">{item.detail}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{item.price}</div>
                      <div className="text-xs text-gray-400">{item.delivery}</div>
                      {item.tag && <Tag color="green" className="mt-1 text-xs">{item.tag}</Tag>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
