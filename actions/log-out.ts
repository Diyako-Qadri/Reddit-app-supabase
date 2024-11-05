'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';


export const LogOut = () => {
  const supabase = createClient();

  supabase.auth.signOut();

  redirect('/')
};
