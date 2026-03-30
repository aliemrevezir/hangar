'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from 'antd';
import {
  DashboardOutlined,
  ShopOutlined,
  FileTextOutlined,
  ReadOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { logout } from '@/actions/auth-actions';

const menuItems = [
  { label: 'Dashboard', href: '/admin', icon: <DashboardOutlined /> },
  { label: 'Esnaflar', href: '/admin/esnaflar', icon: <ShopOutlined /> },
  { label: 'Talepler', href: '/admin/talepler', icon: <FileTextOutlined /> },
  { label: 'Blog', href: '/admin/blog', icon: <ReadOutlined /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
        onClick={() => setOpen(!open)}
      >
        {open ? <CloseOutlined /> : <MenuOutlined />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 transform transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-lg font-bold">Hangar Admin</span>
          </Link>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <form action={logout}>
            <Button
              htmlType="submit"
              icon={<LogoutOutlined />}
              block
              danger
            >
              Çıkış Yap
            </Button>
          </form>
        </div>
      </aside>
    </>
  );
}
