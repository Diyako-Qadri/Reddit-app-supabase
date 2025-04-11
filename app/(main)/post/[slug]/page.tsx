import Button from '@/components/button';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const { data: post, error } = await supabase
    .from('posts')
    .select('id, title, content, user_id, users("email"), image')
    .eq('slug', params.slug)
    .single();

  if (error || !post) notFound();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthor = user && user.id === post?.user_id;

  return (
    <main>
      <article>
        <header>
        <div className='space-y-1'>
            <span className='text-zinc-600'>{post.users?.email}</span>
            <h1 className='text-2xl font-bold'>{post.title}</h1>
          </div>
          {isAuthor && (
            <div className='flex gap-3'>
              <Button variant="secondary" type='link' href={`/post/${params.slug}/edit`}>edit</Button>
              {/* <postId={post.id} /> */}
            </div>
          )}
        </header>
      </article>
    </main>
  );
}
