import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import BlogPostForm from '@/components/admin/BlogPostForm';

export default async function NewBlogPostPage() {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Yeni Blog Yazısı</h1>
      <BlogPostForm />
    </div>
  );
}
