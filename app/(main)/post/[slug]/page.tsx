import Button from '@/components/button';
import { Posts } from '@/components/posts';
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
    .select('id, title, content, user_id, users("email", "profile_image", "user_name"), slug, image')
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
        <header className='flex flex-col items-center justify-center'>
          <div className="space-y-1">
            {isAuthor && (
              <div className="flex w-full max-w-[200px] gap-3">
                <Button
                  variant="secondary"
                  type="link"
                  href={`/post/${params.slug}/edit`}
                >
                  edit
                </Button>
                <Button
                  variant="secondary"
                  type="link"
                  href={`/post/${params.slug}/edit`}
                >
                  delete
                </Button>
                {/* <postId={post.id} /> */}
              </div>
            )}
            <Posts
              key={post.id}
              title={post.title}
              slug={post.slug}
              author={post.users?.user_name|| 'anonymous'}
              image={post.image ? post.image : undefined}
              content={post.content}
              authorImage={post.users?.profile_image}
            />
          </div>
        </header>
      </article>
    </main>
  );
}
