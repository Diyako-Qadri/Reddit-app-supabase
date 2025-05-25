import 'server-only';

import { type QueryData } from '@supabase/supabase-js';

import { createClient } from './server';

export const getHomePosts = async () => {
  const supabase = createClient();

  return supabase
    .from('posts')
    .select('id, title, slug, users("email", "profile_image", "user_name"), image, content')
    .order('created_at', { ascending: false });
};

export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>