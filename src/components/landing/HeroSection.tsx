'use client';

import { Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Container from '@/components/ui/Container';
import { BRANDS } from '@/lib/constants';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 35 }, (_, i) => currentYear - i);

const popularModels: Record<string, string[]> = {
  BMW: ['F30', 'F10', 'E90', 'E46', 'E60', 'F20', 'G20', 'X5', 'X3'],
  Mercedes: ['W204', 'W205', 'W212', 'W213', 'W221', 'W222', 'Sprinter', 'Vito'],
  Audi: ['A3', 'A4', 'A5', 'A6', 'Q3', 'Q5', 'Q7', 'TT'],
  Volkswagen: ['Golf', 'Passat', 'Polo', 'Tiguan', 'Caddy', 'T5', 'T6', 'Jetta'],
  Ford: ['Focus', 'Fiesta', 'Mondeo', 'Kuga', 'Transit', 'Ranger', 'Connect'],
  Renault: ['Clio', 'Megane', 'Fluence', 'Symbol', 'Kangoo', 'Master', 'Talisman'],
  Fiat: ['Egea', 'Linea', 'Doblo', 'Fiorino', 'Punto', 'Ducato', 'Tipo'],
  Toyota: ['Corolla', 'Yaris', 'RAV4', 'C-HR', 'Hilux', 'Camry', 'Auris'],
  Hyundai: ['i20', 'i30', 'Tucson', 'Accent', 'Elantra', 'Kona', 'Santa Fe'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Jazz', 'HR-V'],
  Opel: ['Astra', 'Corsa', 'Insignia', 'Mokka', 'Vectra', 'Zafira'],
  Volvo: ['S60', 'V40', 'XC60', 'XC90', 'S90', 'V60'],
  Peugeot: ['206', '207', '208', '301', '308', '3008', '5008', '508'],
  Citroen: ['C3', 'C4', 'C5', 'Berlingo', 'C-Elysée', 'DS4'],
  Kia: ['Sportage', 'Ceed', 'Rio', 'Sorento', 'Stonic', 'Niro'],
  Seat: ['Leon', 'Ibiza', 'Arona', 'Ateca', 'Toledo'],
  Skoda: ['Octavia', 'Superb', 'Fabia', 'Karoq', 'Kodiaq', 'Rapid'],
  Nissan: ['Qashqai', 'Juke', 'X-Trail', 'Micra', 'Navara'],
};

export default function HeroSection() {
  const router = useRouter();
  const [brand, setBrand] = useState<string | undefined>();
  const [model, setModel] = useState<string | undefined>();
  const [year, setYear] = useState<string | undefined>();

  const modelOptions = brand && popularModels[brand]
    ? popularModels[brand].map((m) => ({ label: m, value: m }))
    : [];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (brand) params.set('brand', brand);
    if (model) params.set('model', model);
    if (year) params.set('year', year);
    router.push(`/parca-talebi?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-primary-dark to-primary" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZWMzRoNnptMC0zMHY2aC02VjRoNnptMCAxMnY2aC02VjE2aDZ6bTAgMTJ2Nmgtdi0yaC02di02aDZ6bTEyIDEydjZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnptMCAxMnY2aC02VjE2aDZ6bS0yNCAxMnY2aC02di02aDZ6bTAtMzB2NmgtNlY0aDZ6bTAgMTJ2NmgtNlYxNmg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

      <Container>
        <div className="relative pt-16 pb-20 lg:pt-24 lg:pb-28">
          {/* Headline */}
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              Aradığın yedek parçayı
              <span className="block mt-2 bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-200 bg-clip-text text-transparent">
                güvenilir esnaftan bul.
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Marka ve modelini seç, Türkiye&apos;nin dört bir yanındaki yedek parça esnaflarını listele.
              WhatsApp ile hemen iletişime geç.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] rounded-2xl p-2 shadow-2xl">
              <div className="bg-white rounded-xl p-4 sm:p-5">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <Select
                    placeholder="Marka"
                    size="large"
                    className="w-full"
                    value={brand}
                    onChange={(v) => {
                      setBrand(v);
                      setModel(undefined);
                    }}
                    showSearch
                    allowClear
                    options={BRANDS.map((b) => ({ label: b, value: b }))}
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                  />

                  <Select
                    placeholder="Model"
                    size="large"
                    className="w-full"
                    value={model}
                    onChange={(v) => setModel(v)}
                    showSearch
                    allowClear
                    disabled={!brand}
                    options={modelOptions}
                    notFoundContent="Model yazın..."
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                  />

                  <Select
                    placeholder="Yıl"
                    size="large"
                    className="w-full"
                    value={year}
                    onChange={(v) => setYear(v)}
                    showSearch
                    allowClear
                    options={years.map((y) => ({ label: String(y), value: String(y) }))}
                  />

                  <Button
                    type="primary"
                    size="large"
                    icon={<SearchOutlined />}
                    block
                    disabled={!brand}
                    onClick={handleSearch}
                    className="font-semibold h-10"
                    style={{ backgroundColor: '#6B3FA0', height: '40px' }}
                  >
                    Parça Ara
                  </Button>
                </div>

                {/* Quick brand chips */}
                <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">Popüler:</span>
                  {['BMW', 'Mercedes', 'Volkswagen', 'Audi', 'Ford', 'Renault'].map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        setBrand(b);
                        setModel(undefined);
                      }}
                      className={`text-xs px-3 py-1 rounded-full border transition-all ${
                        brand === b
                          ? 'bg-primary text-white border-primary'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Ücretsiz arama
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Doğrulanmış esnaflar
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span> WhatsApp ile direkt iletişim
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
