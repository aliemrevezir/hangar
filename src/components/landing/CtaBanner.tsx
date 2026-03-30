'use client';

import { Button } from 'antd';
import Container from '@/components/ui/Container';

export default function CtaBanner() {
  return (
    <section className="py-12 bg-gradient-to-r from-primary-dark via-primary to-primary-light">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs text-white/60 mb-2">Hangar V2 konsept</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white max-w-2xl">
              Bu yapı sizin modele daha uygun: dizin + talep merkezi + fiyat toplama + SEO motoru.
            </h2>
            <p className="text-white/70 mt-2">
              Yani site sadece bir dizin değil, sanayideki dağınık oto parça merkezini toplayan esnaf operasyon platformu gibi çalışıyor.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="large"
              style={{ backgroundColor: '#ffffff', color: '#6B3FA0', borderColor: '#ffffff', fontWeight: 600 }}
            >
              Demo Akışı Gör
            </Button>
            <Button
              size="large"
              ghost
              style={{ borderColor: '#ffffff', color: '#ffffff' }}
            >
              Wireframe İndir
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
