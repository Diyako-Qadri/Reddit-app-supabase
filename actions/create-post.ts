'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { createClient } from '@/utils/supabase/server';
import { postSchema } from './schemas';
import { slugify } from '@/utils/slugify';
import { UploadImage } from '@/utils/supabase/upload-image';

export const CreatePost = async (data: z.infer<typeof postSchema>) => {
  const parseData = postSchema.parse(data);

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('no authenticated');
  }

  const imageFile = data.image.get('image');
  if (!(imageFile instanceof File) && imageFile !== null) {
    throw new Error('malformed image');
  }

  const imagePublicUrl = imageFile ? await UploadImage(imageFile) : null;

  const {} = await supabase
    .from('posts')
    .insert([
      {
        title: parseData.title,
        content: parseData.content,
        image: imagePublicUrl,
        user_id: user.id,
        slug: slugify(data.title),
      },
    ])
    .select('slug')
    .single()
    .throwOnError();

  revalidatePath('/');
  redirect('/');
};
