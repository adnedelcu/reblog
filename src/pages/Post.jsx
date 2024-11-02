import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { baseUrl } from '../../config';
import { CircleChevronLeft } from "lucide-react";
import { AuthorAttribution } from "../components/AuthorAttribution";
import { AuthorAvatar } from "../components/AuthorAvatar";
import { Comment } from "../components/Comment";

export const Post = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${baseUrl}/posts/${id}?with=all`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPost(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost() ;
  }, []);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {post && post.cover && (
        <img
          width={1400}
          height={720}
          className="mb-5 h-[720px] w-full bg-no-repeat object-cover object-center"
          src={`${post.cover}?w=1400&auto=format,compression`}
          alt={post.title}
        />
      )}
      <div className="mx-auto flex w-full flex-col items-start justify-center px-4 md:flex-row">
        <Link to='/' className="mr-2 rounded-full border border-zinc-100 bg-white p-2 text-zinc-700 shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
          <CircleChevronLeft />
          {/* Back to homepage */}
        </Link>

        <div className="mr-20 flex w-full max-w-3xl flex-col justify-start md:w-3/4 mb-5">
          <h2>
            {!post && <div className="text-center">Post not found</div>}
            {post && <Link to={`/posts/${post.id}`}>{post.title}</Link>}
          </h2>
          {post && (
            <>
              <div className="flex flex-col justify-between space-y-4 pb-8 md:flex-row md:space-y-0">
                <div className="flex items-center space-x-2 text-zinc-500 md:space-y-0 dark:text-zinc-400">
                  <AuthorAvatar post={post} author={post.author} />
                  <AuthorAttribution post={post} author={post.author} />
                </div>
              </div>
              <hr className="w-full border-t border-zinc-300 pb-8 dark:border-zinc-700" />
              <div
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              ></div>
            </>
          )}
        </div>
      </div>
      <hr className="my-8" />
      <div className="mx-auto flex w-full flex-col items-start justify-center px-4 md:flex-row">
        <div className="flex w-full flex-col justify-start">
          <div className="flex justify-between items-center mb-6">
            <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion ({post && post.comments.length || 0})
            </h2>
          </div>
          <form class="mb-6">
            <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label for="comment" class="sr-only">Your comment</label>
              <textarea id="comment" rows="6" class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Write a comment..." required=""></textarea>
            </div>
            <button type="button" class="btn" onClick={() => alert('Coming soon')}>
              Post comment
            </button>
        </form>
          {post && post.comments && post.comments.map((comment, key) => <Comment key={key} comment={comment} />)}
        </div>
      </div>
    </>

  )
}
