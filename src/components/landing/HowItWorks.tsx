'use client';

import { FormOutlined, SendOutlined, CheckCircleOutlined } from '@ant-design/icons';
import Container from '@/components/ui/Container';

const steps = [
  {
    number: 1,
    icon: <FormOutlined className="text-2xl" />,
    title: 'Parça talebinizi oluşturun',
    description: 'Araç marka, model ve yıl bilgisini girin. İhtiyacınız olan parçayı tanımlayın.',
  },
  {
    number: 2,
    icon: <SendOutlined className="text-2xl" />,
    title: 'Esnaflardan teklif alın',
    description: 'Uzmanlık alanına göre eşleşen esnaflar size fiyat ve teslimat bilgisi gönderir.',
  },
  {
    number: 3,
    icon: <CheckCircleOutlined className="text-2xl" />,
    title: 'Karşılaştırın ve iletişime geçin',
    description: 'Teklifleri yan yana görün, size en uygun esnafa WhatsApp ile ulaşın.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <Container>
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-foreground mb-4">Nasıl Çalışır?</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Üç adımda ihtiyacınız olan parçaya ulaşın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center">
              {/* Connector line on desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-gray-200" />
              )}

              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-5">
                {step.icon}
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  {step.number}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
