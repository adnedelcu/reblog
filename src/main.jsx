import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Layout } from './pages/Layout.jsx';
import { Post } from './pages/Post.jsx';
import { User } from './pages/User.jsx';
import { Homepage } from './pages/Homepage.jsx';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { NewPost } from './pages/NewPost.jsx';
import { Logout } from './pages/Logout.jsx';

const router = createBrowserRouter([{
  element: <Layout />,
  children: [{
    path: '/',
    element: <Homepage />,
    index: true,
  }, {
    path: '/posts/:id',
    element: <Post />,
  }, {
    path: '/users/:id',
    element: <User />,
  }, {
    path: '/login',
    element: <Login />,
    loader: () => ({
      anonymous: true,
    }),
  }, {
    path: '/register',
    element: <Register />,
    loader: () => ({
      anonymous: true,
    }),
  }, {
    path: '/new-post',
    element: <NewPost />,
    loader: () => ({
      isProtected: true,
    }),
  }, {
    path: '/logout',
    element: <Logout />,
    loader: () => ({
      isProtected: true,
    }),
  }],
}]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
