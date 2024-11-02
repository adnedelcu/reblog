import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { baseUrl } from '../../config';
import { CircleChevronLeft } from "lucide-react";
import { PostEntry } from "../components/PostEntry";

export const User = () => {
  const { id } = useParams();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/${id}?with[]=posts`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser() ;
  }, []);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="max-w-screen m-6 mx-8">
        {loading ? (
          <span className='loading loading-infinity loading-md'></span>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-5">Posts by user {user.first_name} {user.last_name} </h1>
            {user.posts.map((post, key) => <PostEntry key={key} post={post} author={user} />)}
          </>
        )}
      </div>
    </>

  )
}
