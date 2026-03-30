'use client';

import { Button, Input, Select, Switch, Form, Card } from 'antd';
import { createBlogPost, updateBlogPost } from '@/actions/blog-actions';
import type { BlogPost } from '@prisma/client';

const { TextArea } = Input;

const categoryOptions = [
  { label: 'Tavsiye', value: 'tavsiye' },
  { label: 'Rehber', value: 'rehber' },
  { label: 'Sponsorlu', value: 'sponsorlu' },
  { label: 'Haber', value: 'haber' },
];

const authorOptions = [
  'Doğan Kabak',
  'Ünal Turan',
  'Tunç Mete',
  'Selin Yıldırım',
  'Kuzen Emre',
].map((a) => ({ label: a, value: a }));

export default function BlogPostForm({ post }: { post?: BlogPost }) {
  const isEdit = !!post;

  const handleSubmit = async (values: Record<string, unknown>) => {
    const formData = new FormData();
    formData.set('title', values.title as string);
    formData.set('excerpt', values.excerpt as string);
    formData.set('content', values.content as string);
    formData.set('author', values.author as string);
    formData.set('category', values.category as string);
    formData.set('tags', JSON.stringify(values.tags || []));
    formData.set('isPublished', String(values.isPublished ?? true));

    if (isEdit) {
      await updateBlogPost(post.id, formData);
    } else {
      await createBlogPost(formData);
    }
  };

  return (
    <Card className="max-w-3xl shadow-sm">
      <Form
        layout="vertical"
        initialValues={post || { isPublished: true, category: 'rehber' }}
        onFinish={handleSubmit}
      >
        <Form.Item label="Başlık" name="title" rules={[{ required: true, message: 'Zorunlu' }]}>
          <Input placeholder="BMW F30 Çıkma Far Alırken..." size="large" />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Form.Item label="Yazar" name="author" rules={[{ required: true, message: 'Zorunlu' }]}>
            <Select options={authorOptions} placeholder="Yazar seçin" showSearch />
          </Form.Item>

          <Form.Item label="Kategori" name="category" rules={[{ required: true, message: 'Zorunlu' }]}>
            <Select options={categoryOptions} placeholder="Kategori seçin" />
          </Form.Item>
        </div>

        <Form.Item label="Özet" name="excerpt" rules={[{ required: true, message: 'Zorunlu' }]}>
          <TextArea rows={2} placeholder="Kısa özet yazın..." />
        </Form.Item>

        <Form.Item label="İçerik" name="content" rules={[{ required: true, message: 'Zorunlu' }]}>
          <TextArea rows={15} placeholder="Yazı içeriği..." />
        </Form.Item>

        <Form.Item label="Etiketler" name="tags">
          <Select mode="tags" placeholder="Etiket ekleyin (Enter ile)" />
        </Form.Item>

        <div className="flex items-center gap-6">
          <Form.Item label="Yayınla" name="isPublished" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" style={{ backgroundColor: '#6B3FA0' }}>
              {isEdit ? 'Güncelle' : 'Yazı Oluştur'}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
}
