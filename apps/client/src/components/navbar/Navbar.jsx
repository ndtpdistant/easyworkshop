import { useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../Input';
import Button from '../Button';

import logo from '../../assets/icons/easy-workshop-logo-black.svg';
import search_icon from '../../assets/icons/search-icon.svg';
import style from './Navbar.module.scss';

const Navbar = (props) => {
  const [auth, setAuth] = useState(false);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className="">
          <a href="/">
            <img className={style.logo} src={logo} alt="easy workshop" />
          </a>
        </div>
        <nav className={style.nav}>
          <ul className={style.menu}>
            <li className={style.menu_item}>
              <a href="/">Home</a>
            </li>
            <li className={style.menu_item}>
              <a href="#">About</a>
            </li>
            <li className={style.menu_item}>
              <a href="#">Contact</a>
            </li>
          </ul>
          <form className={style.search} method="" action="">
            <Input
              inlineStyle={{
                width: '420px',
                height: '46px',
                borderRadius: '50px',
                paddingLeft: '25px',
                fontSize: '16px',
              }}
              placeholder={'Search for...'}
              type={'text'}
            />
            <button className={style.search_submit} type="submit">
              <img className="" src={search_icon} alt="search-icon" />
            </button>
          </form>
          <div className={style.account}>
            <Link to="auth">
              <Button
                inlineStyle={{
                  width: '138px',
                  height: '54px',
                  borderRadius: '30px',
                }}
                text={auth ? 'Profile' : 'Get started'}
              />
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
