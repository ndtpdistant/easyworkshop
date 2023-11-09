import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Auth from './pages/auth/Auth';
import Home, { loader as homeLoader } from './pages/home/Home';
import Root from './pages/root/Root';
import Item, { loader as itemLoader } from './pages/item/Item';
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
    ],
  },
  {
    path: 'auth',
    element: <Auth />,
  },
]);

root.render(
  <>
    <RouterProvider router={router} />
    {/* <Auth /> */}
    {/* <div style={{display: "flex", backgroundColor: '#F2F2F2', flexDirection: "column", height: '200vh',
    }}> */}
    {/* for test only */}
    {/* <Navbar /> */}
    {/* <h1>content</h1> */}
    {/* <Footer style={{}}/> */}
    {/* </div> */}
    {/* <Button inlineStyle={{height: '123px'}} onClick={() => console.log(1)}/> */}
    {/* <Auth /> */}
  </>,
);
