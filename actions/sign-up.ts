'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export const signUp = async (formData: FormData) => {
  const data = {
    user_name: formData.get('username') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp(data);

  if ( user && user.email ) {
    const { id, email } = user
    await supabase.from('users').insert([{ id, email, user_name: data.user_name }])
  }

  console.log({ user, error });

  redirect('/');
};
