import { Outlet } from 'react-router';
import { useEffect, useState } from 'react';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

import style from './Root.module.scss';
import EasyworkshopService from '../../services/EasyworkshopService';

const Root = () => {
  const easyworkshopService = new EasyworkshopService();
  const [mobile, setMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (window.screen.width < 480) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    setLoading(true)
  }, [name])

  return (
    <div className={style.root}>
      <Navbar mobile={mobile} setName={setName} />
      <Outlet  context={{name: [name, setName], loading: [loading, setLoading]}}/>
      <Footer />
    </div>
  );
};

export default Root;
