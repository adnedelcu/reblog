import { baseUrl } from '../../config';
import { useState, useEffect } from 'react';
import { PostEntry } from '../components/PostEntry';

export const Homepage = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${baseUrl}/posts?with[]=author`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPosts(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="max-w-screen m-6">
        <div className="flex w-full justify-between">
          <div className="flex justify-start">
            <h1 className="text-2xl font-bold mb-6">All Posts</h1>
          </div>
        </div>

        {loading ? (
          <span className='loading loading-infinity loading-md'></span>
        ) : (
          posts.map((post, key) => <PostEntry key={key} post={post} author={post.author} />)
        )}
      </div>
      </>
  )
}
