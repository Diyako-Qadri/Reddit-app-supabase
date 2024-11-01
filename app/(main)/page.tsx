import { getHomePosts } from '@/utils/supabase/queries';
import { HomePosts } from '../../components/Home/post';

export const revalidate = 60 * 15;

export default async function Home() {
  const { data: posts, error } = await getHomePosts();
  
  console.log(posts, error)
  return (
    <main>
      {error || posts.length === 0 ? (
        <div>no posts found</div>
      ) : (
        <section className="flex flex-col items-center gap-4">
          {posts.map(({ id, title, slug, users }) => (
            <HomePosts
              key={id}
              title={title}
              slug={slug}
              author={users?.email || 'anonymous'}
            />
          ))}
        </section>
      )}
    </main>
  );
}
