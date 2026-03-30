'use client';

import { ConfigProvider } from 'antd';
import trTR from 'antd/locale/tr_TR';

const theme = {
  token: {
    colorPrimary: '#6B3FA0',
    borderRadius: 8,
    fontFamily: 'var(--font-geist-sans), Arial, Helvetica, sans-serif',
  },
};

export default function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={theme} locale={trTR}>
      {children}
    </ConfigProvider>
  );
}
