'use client';

// import { SubmitButton } from "@/components/button";
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Tables } from '@/utils/supabase/database.types';
import { editPost } from '@/actions/edit-post';
import { Input } from '@/components/input';
import { createPostSchema } from '@/actions/schemas';
import Button from '@/components/button';

export const EditPostForm = ({
  defaultValues,
  postId,
}: {
  defaultValues: Pick<Tables<'posts'>, 'title' | 'content' >;
  postId: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: defaultValues.title,
      content: defaultValues.content || undefined,
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: editPost,
    onError: error => toast.error(error.message),
    onMutate: () => toast.loading('Updating post ...'),
    onSuccess: () => toast.success('Your post was updated'),
    onSettled: () => toast.dismiss(),
  });

  return (
    <section className="flex justify-center">
      <form
        onSubmit={handleSubmit(data => mutate({ data, postId }))}
        className="flex flex-col gap-4 w-full max-w-[48rem] px-5"
      >
        <Input
          {...register('title')}
          type="text"
          label="Title"
          name="title"
          required
          error={errors.title}
        />
        <textarea
          required
          {...register('content')}
          placeholder="Your content here..."
          rows={10}
          className="border-2 rounded-2xl p-3 bg-white"
          name="content"
          id="content"
        ></textarea>
        <Button type="submit" size="primary" variant="primary">
          {isPending ? <Loader className="animate-spin mx-auto" /> : 'Save'}
        </Button>
        {error && <p className="text-red-700">{error.message}</p>}
      </form>
    </section>
  );
};
