import { useState } from 'react';
import { Link, Form } from 'react-router-dom';

import Input from '../Input';

import logo from '../../assets/icons/easy-workshop-logo-black.svg';
import SearchIconMobile from '../../assets/icons/SearchIconMobile';
import user from '../../assets/icons/User.svg';
import style from './NavbarMobile.module.scss';

const NavbarMobile = () => {
  const [auth, setAuth] = useState(false);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <nav className={style.nav}>
          <div className={`${style.burgerMenu} ${style.burgerMenuOpen}`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={style.logo}>
            <Link to={'/'}>
              <img className={style.logo} src={logo} alt="easy workshop" />
            </Link>
          </div>
          <div className={style.account}>
            <Link to={auth ? 'profile' : 'auth'}>
              <img className={style.profile} src={user} alt="user" />
            </Link>
          </div>
        </nav>
        <Form className={style.search} method="" action="">
          <Input placeholder={'Search for...'} type={'text'} />
          <button className={style.search_submit} type="submit">
            <SearchIconMobile />
          </button>
        </Form>
      </div>
    </div>
  );
};

export default NavbarMobile;
