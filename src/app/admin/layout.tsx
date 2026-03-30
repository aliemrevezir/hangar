import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  // Allow login page without auth
  // Layout wraps all /admin routes including /admin/login
  // We check auth in the layout but login page needs to be accessible
  // So we handle this by checking pathname in a different way
  // Since we can't get pathname in layout, we'll just check session
  // and let login page be a separate route that doesn't use this layout check

  return (
    <div className="min-h-screen bg-gray-50">
      {session ? (
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6 lg:p-8 ml-0 lg:ml-64">{children}</main>
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}
