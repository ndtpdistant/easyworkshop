import App from './components/app/App';
import { createRoot } from 'react-dom/client';
import './assets/styles/font-import.scss';
import './assets/styles/global-reset.scss';
import Auth from './pages/Auth';
import Button from './components/Button';
import Card from './components/Card';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const root = createRoot(document.getElementById('root'));

root.render(
  <>
    {/* <Auth /> */}
    {/* <div style={{display: "flex", backgroundColor: '#F2F2F2', flexDirection: "column", height: '200vh',
    }}> */}
    {/* for test only */}
    {/* <Navbar /> */}
    {/* <h1>content</h1> */}
    {/* <Footer style={{}}/> */}
    {/* </div> */}
    {/* <Button text={'click'} inlineStyle={{height: '123px'}} onClick={() => console.log(1)}/> */}
    <Auth />
  </>,
);
