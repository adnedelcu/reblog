import { Navigate } from 'react-router-dom';
import { logout } from '../utils/auth';

export const Logout = () => {
  logout();

  return <Navigate to="/" />
}
