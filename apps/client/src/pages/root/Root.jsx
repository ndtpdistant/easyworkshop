import { Outlet } from 'react-router';
import { useEffect, useState } from 'react';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

import style from './Root.module.scss';

const Root = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (window.screen.width < 480) {
      setMobile(true);
    }
  }, []);

  return (
    <div className={style.root}>
      <Navbar mobile={mobile} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
