import { Outlet } from 'react-router';
import { useEffect, useState } from 'react';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

import style from './Root.module.scss';
import { useNavigate } from 'react-router-dom';

const Root = () => {
  console.log(1)
  const [mobile, setMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(1);
    if (window.screen.width < 480) {
      setMobile(true);
    }
    // navigate(''); // Move navigation here
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
  }, [name]);

  return (
    <div className={style.root}>
      <Navbar mobile={mobile} setName={setName} />
      <Outlet context={{ name: [name, setName], loading: [loading, setLoading] }} />
      <Footer />
    </div>
  );
};

export default Root;
