'use client';

import { Button, Input, Select, Card, Steps } from 'antd';
import { CarOutlined, ToolOutlined, UserOutlined, SendOutlined, EditOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from '@/components/ui/Container';
import { CITIES, BRANDS, PART_TYPES } from '@/lib/constants';
import { createPartRequest } from '@/actions/part-request-actions';

const { TextArea } = Input;

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

export default function PartRequestForm() {
  const searchParams = useSearchParams();
  const prefillBrand = searchParams.get('brand') || '';
  const prefillModel = searchParams.get('model') || '';
  const prefillYear = searchParams.get('year') || '';

  // Hero'dan bilgi geldiyse direkt step 1'den başla
  const hasPrefilledVehicle = !!prefillBrand;
  const [step, setStep] = useState(hasPrefilledVehicle ? 1 : 0);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    brand: prefillBrand,
    model: prefillModel,
    year: prefillYear,
    partType: '',
    partDetail: '',
    city: '',
    customerName: '',
    customerPhone: '',
    chassisNo: '',
  });

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const modelOptions = form.brand && popularModels[form.brand]
    ? popularModels[form.brand].map((m) => ({ label: m, value: m }))
    : [];

  const canNext = () => {
    if (step === 0) return !!form.brand;
    if (step === 1) return !!form.partType && !!form.partDetail;
    if (step === 2) return !!form.customerName && !!form.customerPhone;
    return false;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.set('customerName', form.customerName);
    formData.set('customerPhone', form.customerPhone);
    formData.set('brand', form.brand);
    formData.set('model', form.model);
    formData.set('year', form.year);
    formData.set('partType', form.partType);
    formData.set('partDetail', [form.partDetail, form.chassisNo ? `Şasi: ${form.chassisNo}` : ''].filter(Boolean).join('\n'));
    formData.set('city', form.city);
    await createPartRequest(formData);
  };

  const stepItems = [
    { title: 'Araç', icon: <CarOutlined /> },
    { title: 'Parça', icon: <ToolOutlined /> },
    { title: 'İletişim', icon: <UserOutlined /> },
  ];

  return (
    <section className="py-8 lg:py-12 bg-gray-50 min-h-screen">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Parça Talebi Oluştur</h1>
            <p className="text-gray-500">
              Araç ve parça bilgilerinizi girin, size uygun esnafları bulalım.
            </p>
          </div>

          <Steps current={step} className="mb-8" items={stepItems} />

          {/* Araç bilgisi hero'dan geldiyse özet göster */}
          {hasPrefilledVehicle && step > 0 && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CarOutlined className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {form.brand} {form.model} {form.year && `(${form.year})`}
                  </div>
                  <div className="text-xs text-gray-400">Seçilen araç</div>
                </div>
              </div>
              <Button
                size="small"
                icon={<EditOutlined />}
                onClick={() => setStep(0)}
              >
                Değiştir
              </Button>
            </div>
          )}

          <Card className="shadow-sm">
            {/* Step 0: Araç Bilgisi */}
            {step === 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marka <span className="text-red-500">*</span>
                  </label>
                  <Select
                    placeholder="Araç markasını seçin"
                    size="large"
                    className="w-full"
                    value={form.brand || undefined}
                    onChange={(v) => {
                      update('brand', v);
                      update('model', '');
                    }}
                    showSearch
                    options={BRANDS.map((b) => ({ label: b, value: b }))}
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <Select
                    placeholder={form.brand ? 'Model seçin veya yazın' : 'Önce marka seçin'}
                    size="large"
                    className="w-full"
                    value={form.model || undefined}
                    onChange={(v) => update('model', v)}
                    showSearch
                    allowClear
                    disabled={!form.brand}
                    options={modelOptions}
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Yıl</label>
                  <Select
                    placeholder="Model yılı"
                    size="large"
                    className="w-full"
                    value={form.year || undefined}
                    onChange={(v) => update('year', v)}
                    allowClear
                    showSearch
                    options={years.map((y) => ({ label: String(y), value: String(y) }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Şehir (opsiyonel)</label>
                  <Select
                    placeholder="Yakın esnaf bulmak için şehir seçin"
                    size="large"
                    className="w-full"
                    value={form.city || undefined}
                    onChange={(v) => update('city', v)}
                    allowClear
                    showSearch
                    options={CITIES.map((c) => ({ label: c, value: c }))}
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </div>
              </div>
            )}

            {/* Step 1: Parça Detayı */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Şasi Numarası (opsiyonel)
                  </label>
                  <Input
                    placeholder="VIN / Şasi numaranız varsa girin"
                    size="large"
                    value={form.chassisNo}
                    onChange={(e) => update('chassisNo', e.target.value.toUpperCase())}
                    maxLength={17}
                  />
                  <p className="text-xs text-gray-400 mt-1">17 haneli VIN kodu ile doğru parça eşleşmesi sağlanır</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parça Tipi <span className="text-red-500">*</span>
                  </label>
                  <Select
                    placeholder="Parça kategorisi seçin"
                    size="large"
                    className="w-full"
                    value={form.partType || undefined}
                    onChange={(v) => update('partType', v)}
                    showSearch
                    options={PART_TYPES.map((p) => ({ label: p, value: p }))}
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parça Detayı <span className="text-red-500">*</span>
                  </label>
                  <TextArea
                    rows={4}
                    placeholder={"Aradığınız parçayı detaylı açıklayın.\n\nÖrnek: Sağ ön far komple, OEM kodu varsa belirtin, orijinal mi çıkma mı fark etmez..."}
                    size="large"
                    value={form.partDetail}
                    onChange={(e) => update('partDetail', e.target.value)}
                  />
                </div>

                {!form.city && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Şehir (opsiyonel)</label>
                    <Select
                      placeholder="Yakın esnaf görmek için şehir seçin"
                      size="large"
                      className="w-full"
                      value={form.city || undefined}
                      onChange={(v) => update('city', v)}
                      allowClear
                      showSearch
                      options={CITIES.map((c) => ({ label: c, value: c }))}
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                    />
                  </div>
                )}

                <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
                  <strong>İpucu:</strong> OEM kodu, sağ/sol belirtimi, orijinal/çıkma tercihi gibi
                  detaylar esnafların size daha hızlı dönüş yapmasını sağlar.
                </div>
              </div>
            )}

            {/* Step 2: İletişim */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Soyad <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Adınız Soyadınız"
                    size="large"
                    value={form.customerName}
                    onChange={(e) => update('customerName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon (WhatsApp) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="05XX XXX XX XX"
                    size="large"
                    value={form.customerPhone}
                    onChange={(e) => update('customerPhone', e.target.value)}
                  />
                </div>

                {/* Özet */}
                <div className="bg-gray-50 rounded-lg p-4 mt-2">
                  <h4 className="font-semibold text-sm text-foreground mb-3">Talep Özeti</h4>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="text-gray-500">Araç:</div>
                    <div className="font-medium">
                      {form.brand} {form.model} {form.year && `(${form.year})`}
                    </div>
                    <div className="text-gray-500">Parça:</div>
                    <div className="font-medium">{form.partType}</div>
                    <div className="text-gray-500">Detay:</div>
                    <div className="font-medium truncate">{form.partDetail}</div>
                    {form.chassisNo && (
                      <>
                        <div className="text-gray-500">Şasi:</div>
                        <div className="font-medium font-mono text-xs">{form.chassisNo}</div>
                      </>
                    )}
                    {form.city && (
                      <>
                        <div className="text-gray-500">Şehir:</div>
                        <div className="font-medium">{form.city}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
              <Button
                size="large"
                disabled={step === 0}
                onClick={() => setStep(step - 1)}
              >
                Geri
              </Button>

              {step < 2 ? (
                <Button
                  type="primary"
                  size="large"
                  disabled={!canNext()}
                  onClick={() => setStep(step + 1)}
                  style={{ backgroundColor: '#6B3FA0' }}
                >
                  Devam Et
                </Button>
              ) : (
                <Button
                  type="primary"
                  size="large"
                  icon={<SendOutlined />}
                  disabled={!canNext()}
                  loading={loading}
                  onClick={handleSubmit}
                  style={{ backgroundColor: '#6B3FA0' }}
                >
                  Talebi Gönder & Esnafları Gör
                </Button>
              )}
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
