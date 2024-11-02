import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const AuthorAvatar = ({ author }) => {
  const [hashedEmail, setHashedEmail] = useState('');

  useEffect(() => {
    const msgUint8 = new TextEncoder().encode(author.email); // encode as (utf-8) Uint8Array
    crypto.subtle.digest("SHA-256", msgUint8).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
      setHashedEmail(hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
      ); // convert bytes to hex string
    });
  }, []);

  return (
    <Link to={`/users/${author.id}`}>
      <img
        className="h-8 w-8 rounded-full"
        src={`https://www.gravatar.com/avatar/${hashedEmail}`}
      />
    </Link>
  )
}
