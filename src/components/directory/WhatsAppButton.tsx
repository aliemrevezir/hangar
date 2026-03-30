'use client';

import { Button } from 'antd';
import { WhatsAppOutlined } from '@ant-design/icons';
import { buildWhatsAppUrl } from '@/lib/utils';

export default function WhatsAppButton({
  phone,
  size = 'middle',
  block = false,
}: {
  phone: string;
  size?: 'small' | 'middle' | 'large';
  block?: boolean;
}) {
  return (
    <Button
      type="primary"
      icon={<WhatsAppOutlined />}
      size={size}
      block={block}
      href={buildWhatsAppUrl(phone)}
      target="_blank"
      style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
    >
      WhatsApp
    </Button>
  );
}
