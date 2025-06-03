import Link from 'next/link';
import Image from 'next/image';
import fallbackImage from '@/public/profile_fallback.jpg';
import { UserRound } from 'lucide-react';
export const Posts = ({
  author,
  authorImage,
  title,
  image,
  content,
  slug,
}: {
  author: string;
  authorImage: string;
  title: string;
  image: string | undefined;
  content: string | null;
  slug: string;
}) => {
  return (
    <Link
      href={`/post/${slug}`}
      className="flex w-[98%] flex-col rounded-3xl bg-white p-4"
    >
      <div className="flex flex-row items-center gap-2 my-3">
      {authorImage ? <Image
          src={authorImage}
          alt="author-image"
          className="rounded-[100%] contain-size"
          height={40}
          width={40}
        /> : <UserRound /> }
        <span className="text-zinc-600 font-semibold">{author}</span>
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
