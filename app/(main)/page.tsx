import { getHomePosts } from '@/utils/supabase/queries';
import { HomePosts } from '../../components/Home/post';

export const revalidate = 60 * 15;

export default async function Home() {
  const { data: posts, error } = await getHomePosts();
  
  console.log(posts, error)
  return (
    <main className='my-6 w-full max-w-3xl px-6 flex flex-col  m-auto'>
      {error || posts.length === 0 ? (
        <div>no posts found</div>
      ) : (
        <section className="flex flex-col items-center gap-4">
          {posts.map(({ id, title, slug, users, image, content }) => (
            <HomePosts
              key={id}
              title={title}
              slug={slug}
              author={users?.email || 'anonymous'}
              image={image ? image : undefined}
              content={content}
            />
          ))}
        </section>
      )}
    </main>
  );
}
