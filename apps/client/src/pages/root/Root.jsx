import { Outlet } from 'react-router';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

import style from './Root.module.scss';

const Root = () => {
  return (
    <div className={style.root}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
