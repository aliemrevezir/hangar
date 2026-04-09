'use client';

import { SafetyCertificateOutlined, WhatsAppOutlined, ShopOutlined, StarOutlined } from '@ant-design/icons';
import Container from '@/components/ui/Container';

const trustItems = [
  { icon: <SafetyCertificateOutlined />, text: 'Doğrulanmış esnaf profilleri' },
  { icon: <WhatsAppOutlined />, text: 'WhatsApp ile hızlı iletişim' },
  { icon: <ShopOutlined />, text: 'Türkiye genelinde esnaf ağı' },
  { icon: <StarOutlined />, text: 'Puan ve değerlendirme sistemi' },
];

export default function TrustBar() {
  return (
    <section className="bg-gray-50 border-b border-gray-200 py-5">
      <Container>
        <div className="flex flex-wrap justify-center gap-8 lg:gap-14">
          {trustItems.map((item) => (
            <div key={item.text} className="flex items-center gap-2.5 text-sm text-gray-600">
              <span className="text-primary text-base">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
