'use client';

import { Button } from 'antd';
import Link from 'next/link';
import Container from '@/components/ui/Container';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-primary-dark to-primary" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZWMzRoNnptMC0zMHY2aC02VjRoNnptMCAxMnY2aC02VjE2aDZ6bTAgMTJ2Nmgtdi0yaC02di02aDZ6bTEyIDEydjZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnptMCAxMnY2aC02VjE2aDZ6bS0yNCAxMnY2aC02di02aDZ6bTAtMzB2NmgtNlY0aDZ6bTAgMTJ2NmgtNlYxNmg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

      <Container>
        <div className="relative py-16 lg:py-24 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Yedek parça işinizi dijitale taşıyın
          </h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-8">
            Binlerce müşteriye ulaşın, parça taleplerini alın ve işinizi büyütün.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/uyelik-paketleri">
              <Button size="large" className="font-semibold px-8 h-12">
                Esnaf Başvurusu
              </Button>
            </Link>
            <Link href="/parca-talebi">
              <Button
                size="large"
                ghost
                className="font-semibold px-8 h-12 text-white border-white/30 hover:border-white"
              >
                Parça Talebi Oluştur
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
