import App from './components/app/App';
import { createRoot } from 'react-dom/client';
import './assets/styles/font-import.scss';
import './assets/styles/global-reset.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  // template
  // https://reactrouter.com/en/main/start/tutorial
  {
    path: '/',
    element: '',
    errorElement: <ErrorPage />,
  }
])

root.render(
  <>
    <RouterProvider router={router} />
  </>,
);
