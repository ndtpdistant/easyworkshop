import App from './components/app/App';
import { createRoot } from 'react-dom/client';
import './assets/styles/font-import.scss';
import './assets/styles/global-reset.scss';

const root = createRoot(document.getElementById('root'));

root.render(
  <>
    <App />
  </>
);
