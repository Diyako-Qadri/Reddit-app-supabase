'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { CreatePost } from '@/actions/create-post';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import Button from '@/components/button';
import { postSchema } from '@/actions/schemas';

const createPostSchema = postSchema
  .omit({ image: true })
  .extend({ image: z.instanceof(FileList).optional() });

export default function CratePage() {
  const { mutate, error, isPending } = useMutation({
    mutationFn: CreatePost,
    onError: error => console.log(error.message),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
  });

  return (
    <main className="my-6 w-full px-6 mt-[20vh] flex grow flex-col items-center">
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
        <Button type="submit" size="primary" variant="primary">
          {isPending ? 'Creating...' : 'Create post'}
        </Button>
        {error && <p className="text-primary">{error.message}</p>}
      </form>
    </main>
  );
}
