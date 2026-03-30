'use client';

import { Button, Input, Select, Switch, Rate, Form, Card } from 'antd';
import { CITIES, BRANDS, PART_TYPES, SPECIALTIES } from '@/lib/constants';
import { createDealer, updateDealer } from '@/actions/dealer-actions';
import type { Dealer } from '@prisma/client';

const { TextArea } = Input;

export default function DealerForm({ dealer }: { dealer?: Dealer }) {
  const isEdit = !!dealer;

  const handleSubmit = async (values: Record<string, unknown>) => {
    const formData = new FormData();
    formData.set('name', values.name as string);
    formData.set('phone', values.phone as string);
    formData.set('whatsapp', values.whatsapp as string);
    formData.set('description', (values.description as string) || '');
    formData.set('city', values.city as string);
    formData.set('district', values.district as string);
    formData.set('address', (values.address as string) || '');
    formData.set('brands', JSON.stringify(values.brands || []));
    formData.set('models', JSON.stringify(values.models || []));
    formData.set('partTypes', JSON.stringify(values.partTypes || []));
    formData.set('specialties', JSON.stringify(values.specialties || []));
    formData.set('rating', String(values.rating || 0));
    formData.set('isActive', String(values.isActive ?? true));
    formData.set('isFeatured', String(values.isFeatured ?? false));
    formData.set('plan', (values.plan as string) || 'classic');

    if (isEdit) {
      await updateDealer(dealer.id, formData);
    } else {
      await createDealer(formData);
    }
  };

  return (
    <Card className="max-w-3xl shadow-sm">
      <Form
        layout="vertical"
        initialValues={
          dealer
            ? {
                ...dealer,
                models: dealer.models,
              }
            : { isActive: true, isFeatured: false, rating: 0, plan: 'classic' }
        }
        onFinish={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Form.Item label="Esnaf Adı" name="name" rules={[{ required: true, message: 'Zorunlu alan' }]}>
            <Input placeholder="Yılmaz BMW Çıkma" />
          </Form.Item>

          <Form.Item label="Şehir" name="city" rules={[{ required: true, message: 'Zorunlu alan' }]}>
            <Select
              placeholder="Şehir seçin"
              showSearch
              options={CITIES.map((c) => ({ label: c, value: c }))}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item label="İlçe" name="district" rules={[{ required: true, message: 'Zorunlu alan' }]}>
            <Input placeholder="Bayrampaşa" />
          </Form.Item>

          <Form.Item label="Telefon" name="phone" rules={[{ required: true, message: 'Zorunlu alan' }]}>
            <Input placeholder="05321234567" />
          </Form.Item>

          <Form.Item label="WhatsApp" name="whatsapp" rules={[{ required: true, message: 'Zorunlu alan' }]}>
            <Input placeholder="05321234567" />
          </Form.Item>

          <Form.Item label="Adres" name="address">
            <Input placeholder="Sanayi sitesi No:12" />
          </Form.Item>
        </div>

        <Form.Item label="Açıklama" name="description">
          <TextArea rows={3} placeholder="Esnaf hakkında kısa açıklama..." />
        </Form.Item>

        <Form.Item label="Markalar" name="brands" rules={[{ required: true, message: 'En az bir marka seçin' }]}>
          <Select
            mode="tags"
            placeholder="Marka seçin veya yazın"
            options={BRANDS.map((b) => ({ label: b, value: b }))}
          />
        </Form.Item>

        <Form.Item label="Modeller" name="models">
          <Select mode="tags" placeholder="Model yazın (F30, W204, vb.)" />
        </Form.Item>

        <Form.Item label="Parça Tipleri" name="partTypes">
          <Select
            mode="tags"
            placeholder="Parça tipi seçin"
            options={PART_TYPES.map((p) => ({ label: p, value: p }))}
          />
        </Form.Item>

        <Form.Item label="Uzmanlıklar" name="specialties">
          <Select
            mode="tags"
            placeholder="Uzmanlık seçin"
            options={SPECIALTIES.map((s) => ({ label: s, value: s }))}
          />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6">
          <Form.Item label="Üyelik Paketi" name="plan" rules={[{ required: true }]}>
            <Select
              options={[
                { label: 'Classic (1.500₺)', value: 'classic' },
                { label: 'Gold (2.500₺)', value: 'gold' },
                { label: 'Premium (3.000₺)', value: 'premium' },
              ]}
            />
          </Form.Item>

          <Form.Item label="Puan" name="rating">
            <Rate allowHalf />
          </Form.Item>

          <Form.Item label="Aktif" name="isActive" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item label="Öne Çıkan" name="isFeatured" valuePropName="checked">
            <Switch />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" style={{ backgroundColor: '#6B3FA0' }}>
            {isEdit ? 'Güncelle' : 'Esnaf Ekle'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
