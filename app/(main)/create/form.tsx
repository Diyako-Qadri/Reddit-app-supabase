'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';

import { Input } from '@/components/input-component';
import { Textarea } from '@/components/textarea';
import { postSchema } from '@/actions/schemas';
import { CreatePost } from '@/actions/create-post';
import { useMutation } from '@tanstack/react-query';
import Button from '@/components/button';

const createPostSchema = postSchema
  .omit({ image: true })
  .extend({ image: z.instanceof(FileList).optional() });

export const CreatePostForm = () => {
  const { mutate, error, isPending } = useMutation({
    mutationFn: CreatePost,
    onError: error => toast.error(error.message),
  });

   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm<z.infer<typeof createPostSchema>>({
     resolver: zodResolver(createPostSchema),
   });

  return (
     <form
        onSubmit={handleSubmit(values => {
          const imageForm = new FormData();
          if (values.image) {
            imageForm.append('image', values.image[0]);
          }

          mutate({
            title: values.title,
            content: values.content,
            image: imageForm,
          });
        })}
        className="flex w-full  flex-col gap-4"
      >
      <Input {...register('title')} label="title" error={errors.title} />
      <Input
        {...register('image')}
        type="file"
        error={errors.image}
        file={
          'file:bg-red-500 file:rounded-full file:border-none file:px-4 file:py-1 file:text-white'
        }
      />
      <Textarea
        {...register('content')}
        label="content"
        error={errors.content}
      />
      <Button type="submit">{isPending ? 'uploading post...' : 'post'}</Button>
      {error && <p className="text-primary">{error.message}</p>}
    </form>
  );
};
