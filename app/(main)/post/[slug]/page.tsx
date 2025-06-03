// import Button from '@/components/button';
import { Posts } from '@/components/posts';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { getSinglePost } from '@/utils/supabase/queries';
import { Comments } from '@/components/comments';

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const { data: post, error } = await getSinglePost(supabase, params.slug);

  if (error || !post) notFound();

  const postId = post && post.id;
  const {} = await supabase
    .from('comments')
    .select('content')
    .eq('post_id', postId as string)
    .order('created_at', { ascending: true });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthor = user && user.id === post?.user_id;

  return (
    <main>
      <article className="flex justify-center flex-col">
        <header className="flex flex-col items-center justify-center">
          <div className="space-y-1 flex justify-center">
            <Posts
              key={post.id}
              title={post.title}
              slug={post.slug}
              author={post.users?.user_name || 'anonymous'}
              image={post.image ? post.image : undefined}
              content={post.content}
              authorImage={post.users?.profile_image}
              isAuthor={isAuthor}
              paramsSlug={params.slug}
              postId={post.id}
            />
          </div>
          <Comments postId={postId} slug={params.slug} />
        </header>
      </article>
    </main>
  );
}
