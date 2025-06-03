import { createComment } from '@/actions/create-comment';
import { createClient } from '@/utils/supabase/server';
import { CommentItem } from './comment-item';
import Button from './button';

export const Comments = async ({
  postId,
  slug,
}: {
  postId: string;
  slug: string;
}) => {
  const supabase = createClient();

  const { data: comments } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId as string)
    .order('created_at', { ascending: true });

  if (!comments) {
    throw new Error('No comments found');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: post } = await supabase
    .from('posts')
    .select('user_id')
    .eq('id', postId)
    .single();

  const isAuthor = user && user.id === post?.user_id;

  return (
    <div className='w-full max-w-[42rem] px-5 md:px-0'>
      <div className="">
        {comments.map(item => (
          <CommentItem
            key={item.id}
            comment={item}
            userId={user?.id}
            isAuthor={isAuthor}
            postId={postId}
          />
        ))}
      </div>
      {user && (
        <div className="my-6 w-full ">
          <form
            action={createComment}
            className="flex gap-4 flex-col justify-evenly"
          >
            <textarea
              className="text-black w-full border-2 p-2 rounded-lg"
              placeholder="Comment..."
              rows={3}
              name="comment"
              required
            />
            <input type="hidden" name="postId" value={postId} />

            <Button
              type="submit"
              variant="primary"
            >
              Post
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
