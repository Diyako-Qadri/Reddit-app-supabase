
import { createClient } from '@/utils/supabase/server';
import { EditPostForm } from './form';

export default async function EditPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const { data: post, error } = await supabase
    .from('posts')
    .select(' title, content, user_id, id')
    .eq('slug', params.slug)
    .single();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthor = user && user.id === post?.user_id;

  if (error || !post || !isAuthor) {
    return (
      <p className="text-center text-2xl text-red-600">Restricted area!</p>
    );
  }

  return (
    <main className="main">
      <h2 className="font-mono font-bold text-center text-xl pb-8 md:pb-12">
        Edit post
      </h2>
      <EditPostForm defaultValues={{title: post.title, content: post.content}} postId={post.id} />
    </main>
  );
}
