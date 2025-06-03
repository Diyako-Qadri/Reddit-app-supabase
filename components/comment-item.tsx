import { UserRound } from 'lucide-react';
import { DeleteCommentButton } from './delete-comment-button';

interface CommentItemProps {
  comment: {
    id: string;
    comment?: string;
    user_id?: string;
    author?: string;
  };
  userId: string | undefined;
  isAuthor: boolean | null;
  postId: string;
}

export const CommentItem = ({
  comment,
  userId,
  isAuthor,
  postId,
}: CommentItemProps) => {
  const isAuthenticated = userId === comment.user_id || isAuthor;

  return (
    <div className="p-4 pb-1 rounded-lg my-3 justify-between flex flex-row  items-center">
      <div className="flex flex-col  justify-between w-full">
        <div className='flex flex-row'>
          <UserRound /> {comment.author}
        </div>
      <div className=" text-xl text-black p-2 rounded-md w-full ">
        {comment.comment}
      </div>
      </div>
        <div className="w-5 flex justify-between pt-1">
          {isAuthenticated && (
            <DeleteCommentButton commentId={comment.id} postId={postId} />
          )}
        </div>
    </div>
  );
};
