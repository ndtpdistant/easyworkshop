import App from './components/app/App';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Auth from './pages/Auth';
import Home from './pages/Home';
import ErrorPage from './error-page';

import './assets/styles/font-import.scss';
import './assets/styles/global-reset.scss';

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  // https://reactrouter.com/en/main/start/tutorial
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'auth',
        
      }
    ]
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
    {/* <Button text={'click'} inlineStyle={{height: '123px'}} onClick={() => console.log(1)}/> */}
    {/* <Auth /> */}
  </>,
);
