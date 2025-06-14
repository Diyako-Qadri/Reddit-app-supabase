'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader, Trash2 } from 'lucide-react';
import { deletePost } from '@/actions/delete-post';

export const DeletePostButton = ({ postId }: { postId: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => deletePost(postId),
    onError: error => toast.error(error.message),
    onSuccess: () => toast.success('your post was deleted!'),
    onMutate: () => toast.loading('deleting post...'),
    onSettled: () => toast.dismiss(),
  });

  return (
    <div onClick={() => mutate()}>
      {isPending ? (
        <Loader size={20} className="animate-spin" />
      ) : (
        <Trash2
          className="transition-all cursor-pointer  hover:text-red-600"
          size={20}
        />
      )}
    </div>
  );
};
