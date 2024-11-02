import { Link } from 'react-router-dom';
import { AuthorAttribution } from './AuthorAttribution';
import { AuthorAvatar } from './AuthorAvatar';
import { ChevronRightCircle } from 'lucide-react';

export const PostEntry = ({ post, author }) => {
  return (
    <div className='mb-4'>
      {post.cover && (
        <Link to={`/posts/${post.id}`}>
          <img
            className="mb-5 h-[400px] w-full rounded-xl bg-no-repeat object-cover object-center transition-transform duration-200 ease-out hover:scale-[1.02]"
            src={`${post.cover}`}
            alt={post.title}
          />
        </Link>
      )}
      <h2 className="pb-3 text-xl font-semibold tracking-tight">
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h2>
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center space-x-2 text-zinc-500 md:space-y-0 dark:text-zinc-400">
          <AuthorAvatar author={author || post.author} />
          <AuthorAttribution post={post} author={author || post.author} />
        </div>
      </div>
      <div
        className="py-6 text-zinc-500 dark:text-zinc-300"
        dangerouslySetInnerHTML={{
          __html: post.content.substring(0, 100) + '...',
        }}
      />
      <div className="flex items-center justify-between font-medium text-green-600 dark:text-green-200">
        <Link to={`/posts/${post.id}`}>
          <div className="flex items-center space-x-2">
            <span>Read article</span>
            <ChevronRightCircle />
          </div>
        </Link>
      </div>
    </div>
  )
}
