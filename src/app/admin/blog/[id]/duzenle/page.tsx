import { getSession } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import BlogPostForm from '@/components/admin/BlogPostForm';

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Yazı Düzenle: {post.title}</h1>
      <BlogPostForm post={post} />
    </div>
  );
}
