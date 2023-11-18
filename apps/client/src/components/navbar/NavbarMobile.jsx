import { useState, useEffect } from 'react';
import { Link, Form } from 'react-router-dom';

import Input from '../Input';

import logo from '../../assets/icons/easy-workshop-logo-black.svg';
import SearchIconMobile from '../../assets/icons/SearchIconMobile';
import user from '../../assets/icons/User.svg';
import style from './NavbarMobile.module.scss';

import { jwtDecode } from "jwt-decode";

const NavbarMobile = () => {
  const [auth, setAuth] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [profilePath, setProfilePath] = useState('');

  useEffect(() => {
    document.documentElement.className = isMenuOpen ? 'overflow-hidden' : '';
    document.body.className = isMenuOpen ? 'overflow-hidden' : '';
  }, [isMenuOpen]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setAuth(token);
      setProfilePath(`profile/${jwtDecode(token).sub}`)
    }
  }, [])

  return (
    <div
      className={style.wrapper}
      style={
        isMenuOpen
          ? { height: '100vh', transition: '0.2s height' }
          : { height: '110px', transition: '0.2s height' }
      }
    >
      <div
        className={style.container}
        style={isMenuOpen ? null : { height: 'inherit' } }
      >
        <nav className={style.nav}>
          <div
            onClick={() => setMenuOpen((prevState) => !prevState)}
            className={`${style.burgerMenu} ${
              isMenuOpen ? style.burgerMenuOpen : null
            }`}
          >
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
            <Link to={auth ? `${profilePath}` : 'auth'}>
              <img className={style.profile} src={user} alt="user" />
            </Link>
          </div>
        </nav>
        {isMenuOpen ? null : (
          <Form className={style.search} method="" action="">
            <Input placeholder={'Search for...'} type={'text'} />
            <button className={style.search_submit} type="submit">
              <SearchIconMobile />
            </button>
          </Form>
        )}
      </div>
      {isMenuOpen ? (
        <ul className={style.burgeList}>
          <div className={style.burgerItem}>
            <Link to={'/'}>Home</Link>
          </div>
          <div className={style.burgerItem}>
            <Link to={'/'}>About</Link>
          </div>
          <div className={style.burgerItem}>
            <Link to={'/'}>Add model</Link>
          </div>
          <div className={style.burgerItem}>
            <Link to={'/'}>Liked by you</Link>
          </div>
        </ul>
      ) : null}
    </div>
  );
};

export default NavbarMobile;
