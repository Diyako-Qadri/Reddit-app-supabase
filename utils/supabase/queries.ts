import 'server-only';

import { type QueryData } from '@supabase/supabase-js';

import { createClient } from './server';

export const getHomePosts = async () => {
  const supabase = await createClient();

  return supabase
    .from('posts')
    .select('id, title, slug, users("email")')
    .order('created_at', { ascending: false });
};

export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>