'use server';

import { redirect } from 'next/navigation';
import { createClient } from '../utils/supabase/server';

export const deleteComment = async (commentId: string, postId: string) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('User not authenticated');

  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('user_id, slug')
    .eq('id', postId)
    .single();

  if (postError || !post) {
    throw new Error('Failed to fetch post or post does not exist');
  }

  const isPostAuthor = user && user.id === post?.user_id;

  const { data: comment, error: commentError } = await supabase
    .from('comments')
    .select('user_id')
    .eq('id', commentId)
    .single();

  if (commentError || !comment) {
    throw new Error('Failed to fetch the comment or comment does not exist');
  }

  const isCommentAuthor = user && user.id === comment?.user_id;

  if (!isPostAuthor && !isCommentAuthor) {
    throw new Error('You are not allowed to delete this comment');
  }

  await supabase.from('comments').delete().eq('id', commentId).throwOnError();

  redirect(`/post/${post?.slug}`);
};
