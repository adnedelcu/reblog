import { MessageCircleReply } from 'lucide-react';
import { stringToFriendlyDate } from '../utils/helpers';
import { AuthorAvatar } from './AuthorAvatar';
import { AuthorAttribution } from './AuthorAttribution';

export const Comment = ({ comment, isReply = false }) => {

  return (
    <>
      <div className={`chat ${isReply ? 'chat-end' : 'chat-start'}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <AuthorAvatar author={comment.author} />
          </div>
        </div>
        <div className="chat-header gap-2">
          <AuthorAttribution post={comment} author={comment.author} />
          {/* {`${comment.author.first_name} ${comment.author.last_name}`}
          <time className="text-xs opacity-50">{stringToFriendlyDate(comment.createdAt)}</time> */}
        </div>
        <div className="chat-bubble">{comment.content}</div>
      </div>
      {comment.replies && comment.replies.map((reply, key) => <Comment isReply={true} comment={reply} key={key} />)}
    </>
  );

  return (
    <>
      <article className={`${isReply ? `ml-4` : ''} mb-2 p-6 text-base rounded-lg`}>
        <footer className="flex justify-betwee items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 gap-3 text-sm text-gray-900 dark:text-white font-semibold">
              <AuthorAvatar author={comment.author} />
              {comment.author.first_name} {comment.author.last_name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time dateTime={stringToFriendlyDate(comment.createdAt)}>{stringToFriendlyDate(comment.createdAt)}</time>
            </p>
          </div>
          {/* <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"></path>
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li><a>Item 1</a></li>
              <li><a>Item 2</a></li>
            </ul>
          </div> */}
        </footer>
        <p className="text-gray-500 dark:text-gray-400">{comment.content}</p>
        <div className="flex items-center mt-4 space-x-4">
          <button className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium gap-3">
            <MessageCircleReply />
            Reply
          </button>
        </div>
      </article>
      {comment.replies && comment.replies.map((reply, key) => <Comment isReply={true} comment={reply} key={key} />)}
      {!isReply && <hr className="mb-2" />}
    </>
  )
}
