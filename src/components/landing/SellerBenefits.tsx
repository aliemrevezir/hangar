'use client';

import { Button, Card } from 'antd';
import { ShopOutlined, AimOutlined, SafetyCertificateOutlined, PhoneOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Container from '@/components/ui/Container';

const benefits = [
  {
    icon: <ShopOutlined className="text-2xl" />,
    title: 'Dijital vitrin',
    description: 'Profesyonel profil sayfanızla 7/24 açık bir mağazanız olsun.',
  },
  {
    icon: <AimOutlined className="text-2xl" />,
    title: 'Doğru müşteri eşleşmesi',
    description: 'Uzmanlık alanınıza göre parça talepleri size yönlendirilsin.',
  },
  {
    icon: <SafetyCertificateOutlined className="text-2xl" />,
    title: 'Güvenilirlik rozeti',
    description: 'Gold ve Premium rozetleriyle müşteri güveni kazanın.',
  },
  {
    icon: <PhoneOutlined className="text-2xl" />,
    title: 'Kolay iletişim',
    description: 'WhatsApp ve telefon butonlarıyla müşteriler sizi hemen bulsun.',
  },
];

export default function SellerBenefits() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Neden Hangar&apos;da yer almalısınız?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Dijital vitrininizi açın, yeni müşterilere ulaşın.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {benefits.map((item) => (
            <Card key={item.title} className="text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                {item.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/uyelik-paketleri">
            <Button type="primary" size="large" style={{ backgroundColor: '#6B3FA0' }}>
              Hemen Başvurun
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
