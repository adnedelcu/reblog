import { Link } from 'react-router-dom';
import { stringToFriendlyDate } from '../utils/helpers';

export const AuthorAttribution = ({ post, author }) => {
  return (
    <div className="flex space-x-1">
      <span>by</span>
      <Link
        to={`/users/${author.id}`}
        className="font-medium text-green-600 dark:text-green-200"
      >
        {author.first_name} {author.last_name}
      </Link>
      <span>
        on {stringToFriendlyDate(post.createdAt)}
      </span>
    </div>
  );
}
