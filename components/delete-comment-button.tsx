"use client";

import { Loader, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteComment } from "@/actions/delete-comment";

export const DeleteCommentButton = ({ commentId, postId }: { commentId: string, postId: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteComment(commentId, postId),
    onError: (error) => toast(error.message),
    onSuccess: () => toast.success("Comment deleted"),
    onMutate: () => toast.loading("Deleting comment..."),
    onSettled: () => toast.dismiss(),
  });
  return (
    <div onClick={() => mutate()}>
      {isPending ? (
        <Loader size={20} className="animate-spin-slow" />
      ) : (
        <Trash2
          className="transition-all cursor-pointer  hover:text-red-600"
          size={20}
        />
      )}
    </div>
  );
};