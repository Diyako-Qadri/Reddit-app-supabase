import Link from 'next/link';
import Image from 'next/image';
import { PenLine, UserRound } from 'lucide-react';
import { DeletePostButton } from './delete-post-button';

interface PostsProps {
  author: string;
  authorImage: string;
  title: string;
  image: string | undefined;
  content: string | null;
  slug: string;
  isAuthor?: boolean | null;
  paramsSlug?: string;
  postId: string;
}

export const Posts = ({
  author,
  authorImage,
  title,
  image,
  content,
  slug,
  isAuthor,
  paramsSlug,
  postId,
}: PostsProps) => {
  return (
    <Link
      href={`/post/${slug}`}
      className="flex flex-col mx-auto items-start rounded-3xl bg-white p-4"
    >
      <div className="flex flex-row items-center border-b-2 justify-between  py-3 my-3">
        <div className='flex flex-row justify-start'>
          {authorImage ? (
            <Image
              src={authorImage}
              alt="author-image"
              className="rounded-[100%] contain-size"
              height={40}
              width={40}
            />
          ) : (
            <UserRound />
          )}
          <span className="text-zinc-600 ml-2 flex justify-center items-center font-semibold">{author}</span>
        </div>
        {isAuthor && (
          <div className="flex  gap-3">
            <Link
              className="flex flex-row gap-3"
              type="link"
              href={`/post/${paramsSlug}/edit`}
            >
              <PenLine className="hover:text-blue-500" />
            </Link>
            <DeletePostButton postId={postId} />
          </div>
        )}
      </div>

      <h2 className="text-lg font-bold">{title}</h2>
      <div>{content}</div>
      {image && (
        <Image
          src={image}
          alt="post-image"
          className="rounded-xl"
          width={700}
          height={400}
        />
      )}
    </Link>
  );
};
