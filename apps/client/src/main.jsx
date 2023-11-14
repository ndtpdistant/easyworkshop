import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Auth from './pages/auth/Auth';
import Home, { loader as homeLoader } from './pages/home/Home';
import Root from './pages/root/Root';
import Item, { loader as itemLoader } from './pages/item/Item';
import Profile, { loader as profileLoader } from './pages/profile/Profile';
import Edit from './pages/edit/Edit';
import EditProfile from './pages/profile/editProfile';
import ErrorPage from './error-page';

import './assets/styles/font-import.scss';
import './assets/styles/global-reset.scss';

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  // https://reactrouter.com/en/main/start/tutorial
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      {
        path: 'item/:itemId',
        element: <Item />,
        loader: itemLoader,
      },
      {
        path: 'profile/:profileId',
        element: <Profile />,
        loader: profileLoader,
      },
      {
        path: 'edit',
        element: <Edit />
    
      }
    ],
  },
  {
    path: '/profile/edit',
    element: <EditProfile />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'auth',
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
]);

root.render(
  <>
    <RouterProvider router={router} />
  </>,
);
