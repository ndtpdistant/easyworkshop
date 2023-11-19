import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home, { loader as homeLoader } from './pages/home/Home';
import Item, { loader as itemLoader } from './pages/item/Item';
import Favorite, { loader as favoriteLoader } from './pages/favorite/Favorite';
import Profile, { loader as profileLoader } from './pages/profile/Profile';
import Auth from './pages/auth/Auth';
import Root from './pages/root/Root';
import EditProfile, {
  loader as editProfileLoader,
} from './pages/profile/editProfile';
import ErrorPage from './error-page';
import Add from './pages/add/Add';

import './assets/styles/font-import.scss';
import './assets/styles/global-reset.scss';
import Slicer from './pages/slicer/Slicer';

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([
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
        path: 'favorite',
        element: <Favorite />,
        loader: favoriteLoader,
      },
    ],
  },
  {
    path: '/profile/:profileId/edit',
    element: <EditProfile />,
    loader: editProfileLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: '/slicer',
    errorElement: <ErrorPage />,
    element: <Slicer />,
  },
  {
    path: '/item/add',
    element: <Add />,
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
