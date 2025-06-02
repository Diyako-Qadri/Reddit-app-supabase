// import Button from '@/components/button';
import { Posts } from '@/components/posts';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PenLine} from 'lucide-react';
import { getSinglePost } from '@/utils/supabase/queries';
import { DeletePostButton } from '@/components/delete-post-button';

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const { data: post, error } = await getSinglePost(supabase, params.slug);

  if (error || !post) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthor = user && user.id === post?.user_id;

  return (
    <main>
      <article>
        <header className="flex flex-col items-center justify-center">
          <div className="space-y-1">
            <Posts
              key={post.id}
              title={post.title}
              slug={post.slug}
              author={post.users?.user_name || 'anonymous'}
              image={post.image ? post.image : undefined}
              content={post.content}
              authorImage={post.users?.profile_image}
            />
          </div>
          {isAuthor && (
            <div className="flex w-full  max-w-[200px] gap-3">
              <Link
                className="flex flex-row gap-3"
                type="link"
                href={`/post/${params.slug}/edit`}
              >
                <PenLine className='hover:text-blue-500' />
              </Link>
              <DeletePostButton postId={post.id}/>
            </div>
          )}
        </header>
      </article>
    </main>
  );
}
