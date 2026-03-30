'use client';

import { useActionState } from 'react';
import { Button, Input, Card } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '@/actions/auth-actions';

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-primary rounded-xl mx-auto mb-3 flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Hangar Admin</h1>
          <p className="text-sm text-gray-500">Yönetim paneline giriş yapın</p>
        </div>

        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
              {state.error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
            <Input
              name="email"
              type="email"
              prefix={<MailOutlined />}
              placeholder="admin@hangar.com"
              size="large"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
            <Input.Password
              name="password"
              prefix={<LockOutlined />}
              placeholder="Şifrenizi girin"
              size="large"
              required
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={isPending}
            style={{ backgroundColor: '#6B3FA0' }}
          >
            Giriş Yap
          </Button>
        </form>
      </Card>
    </div>
  );
}
