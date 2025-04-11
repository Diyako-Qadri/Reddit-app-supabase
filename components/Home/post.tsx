import Link from 'next/link'

export const HomePosts = ({
  author,
  title,
  image,
  content,
  slug,
}: {
  author: string
  title: string
  image: string | undefined
  content: string | null
  slug: string
}) => {
  return (
    <Link
      href={`/post/${slug}`}
      className='flex w-full flex-col rounded-3xl bg-white p-4'
    >
      <span className='text-zinc-600'>{author}</span>
      <h2 className='text-lg font-bold'>{title}</h2>
      <img src={image} alt="post-image" className='rounded-xl max-w-[700px]'  />
      <div>{content}</div>
    </Link>
  )
}