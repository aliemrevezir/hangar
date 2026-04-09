'use client';

import { Button, Card } from 'antd';
import { CheckCircleOutlined, RightOutlined, CarOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Container from '@/components/ui/Container';

const benefits = [
  'Araç marka, model ve yıl bilgisini girin',
  'Parça adı veya OEM kodunu yazın, fotoğraf ekleyin',
  'Uygun esnaflardan teklif alın, karşılaştırın',
];

export default function PartRequestCTA() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              İhtiyacınız olan parçayı bulalım
            </h2>
            <p className="text-gray-500 mb-8">
              Araç bilgilerinizi girin, size en uygun esnafları eşleştirelim.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircleOutlined className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <Link href="/parca-talebi">
              <Button
                type="primary"
                size="large"
                icon={<RightOutlined />}
                style={{ backgroundColor: '#6B3FA0' }}
              >
                Parça Talebi Oluştur
              </Button>
            </Link>
          </div>

          <div>
            <Card className="shadow-md border-gray-200">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CarOutlined className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Örnek Talep</p>
                  <p className="text-xs text-gray-400">Parça talebi formu</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-400">Araç</span>
                  <span className="font-medium text-foreground">BMW F30 — 2015</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-400">Parça</span>
                  <span className="font-medium text-foreground">Sağ far komple</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-400">Tercih</span>
                  <span className="font-medium text-foreground">Orijinal veya temiz çıkma</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Durum</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium">
                    3 teklif alındı
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
