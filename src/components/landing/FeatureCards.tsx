'use client';

import { Card } from 'antd';
import { ShopOutlined, SendOutlined, TableOutlined, SearchOutlined } from '@ant-design/icons';
import Container from '@/components/ui/Container';

const features = [
  {
    icon: <ShopOutlined className="text-2xl text-primary" />,
    title: 'Mini mağaza sayfası',
    description: 'Her esnaf için logo, kapak alanı, uzmanlık, iletişim, hatta bir blog bilgisi olan profesyonel profil.',
  },
  {
    icon: <SendOutlined className="text-2xl text-primary" />,
    title: 'Talep yönlendirme sistemi',
    description: 'Talep herkese değil, doğru bölgeye, doğru markaya ve uygun üyelik planındaki esnaflara gitsin.',
  },
  {
    icon: <TableOutlined className="text-2xl text-primary" />,
    title: 'Teklif karşılaştırma tablosu',
    description: 'Müşteriye "abi burada bu fiyat, burada bu fiyat" diye temiz PDF / WhatsApp teklifi çıkarsınız.',
  },
  {
    icon: <SearchOutlined className="text-2xl text-primary" />,
    title: 'SEO sayfa yapısı',
    description: 'Marka + model + parça bazlı landing sayfaları, tag yapısıyla Google\'da keşfedilebilir olursunuz.',
  },
];

export default function FeatureCards() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-xl mx-auto mb-4 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
