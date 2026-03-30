import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import BlogPostTable from '@/components/admin/BlogPostTable';
import Link from 'next/link';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default async function AdminBlogPage() {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Blog Yazıları</h1>
        <Link href="/admin/blog/yeni">
          <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: '#6B3FA0' }}>
            Yeni Yazı
          </Button>
        </Link>
      </div>
      <BlogPostTable posts={posts} />
    </div>
  );
}
