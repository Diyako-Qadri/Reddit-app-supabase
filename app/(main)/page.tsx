import { getHomePosts } from '@/utils/supabase/queries';
import { Posts } from '../../components/posts';

export const revalidate = 60 * 15;

export default async function Home() {
  const { data: posts, error } = await getHomePosts();

  console.log(posts, error);
  return (
    <main className="my-6 w-full max-w-3xl mx-auto flex flex-row">
      {error || posts.length === 0 ? (
        <div>no posts found</div>
      ) : (
        <section className="flex flex-col w-full ">
          {posts.map(({ id, title, slug, users, image, content }) => (
            <Posts
              key={id}
              title={title}
              slug={slug}
              author={users?.user_name || 'anonymous'}
              image={image ? image : undefined}
              content={content}
              authorImage={users.profile_image}
              postId={id}
            />
          ))}
        </section>
      )}
    </main>
  );
}
