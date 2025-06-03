'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { UploadImage } from '@/utils/supabase/upload-image';

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

  const imageFile = formData.get('image');
  if (!(imageFile instanceof File) && imageFile !== null) {
    throw new Error('malformed image');
  }
  const imagePublicUrl = imageFile ? await UploadImage(imageFile) : null;
  if (user && user.email) {
    const { id, email } = user;
    await supabase.from('users').insert([
      {
        id: id,
        email: email,
        user_name: data.user_name,
        profile_image: imagePublicUrl ?? '',
         created_at: new Date().toISOString(), 
      },
    ]);
  }

  console.log({ user, error });

  redirect('/');
};
