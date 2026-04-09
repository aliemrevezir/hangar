'use client';

import { useState } from 'react';
import { Button } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Container from '@/components/ui/Container';

const navLinks = [
  { label: 'Esnaf Dizini', href: '/esnaf-dizini' },
  { label: 'Parça Talebi', href: '/parca-talebi' },
  { label: 'Üyelik Paketleri', href: '/uyelik-paketleri' },
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <Container>
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-foreground">Hangar</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-gray-600 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button type="default" href="/admin/login">
              Giriş Yap
            </Button>
            <Button type="primary" href="/uyelik-paketleri" style={{ backgroundColor: '#6B3FA0' }}>
              Esnaf Başvurusu
            </Button>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </nav>
      </Container>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4">
          <Container>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-primary py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-3 border-t border-gray-100">
                <Button type="default" href="/admin/login" block>
                  Giriş Yap
                </Button>
                <Button type="primary" href="/uyelik-paketleri" block style={{ backgroundColor: '#6B3FA0' }}>
                  Esnaf Başvurusu
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
