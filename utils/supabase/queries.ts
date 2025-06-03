import { createClient } from './client';
import { QueryData } from '@supabase/supabase-js';

export const getSinglePost = async (
  supabase: ReturnType<typeof createClient>,
  slug: string
) => {
  return supabase
    .from('posts')
    .select(
      'id, title, content, user_id, users("email", "profile_image", "user_name"), slug, image'
    )
    .eq('slug', slug)
    .single();
};

export const getComments = async (postId: string) => {
  const supabase = createClient();
  return supabase
    .from('comments')
    .select('content')
    .eq('post_id', postId)
    .order('created_at', { ascending: false });
};

export const getHomePosts = async () => {
  const supabase = createClient();
  return supabase
    .from('posts')
    .select(
      'id, title, slug, users("email", "profile_image", "user_name"), image, content'
    )
    .order('created_at', { ascending: false });
};

export const getPostsByQuery = (searchQuery: string) => {
  const supabase = createClient();
  return supabase
    .from('posts')
    .select(
      'id, title, slug, users("profile_image", "user_name"), image, content'
    )
    .ilike('title', `%${searchQuery}%`);
};

export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>;
