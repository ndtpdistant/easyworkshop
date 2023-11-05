import { useState } from 'react';
import Input from '../Input';
import Button from '../Button';

import logo from '../../assets/icons/easy-workshop-logo-black.svg';
import search_icon from '../../assets/icons/search-icon.svg';
import * as style from './Navbar.module.scss';

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
              width={420}
              height={46}
              borderRadius={50}
              paddingLeft={25}
              placeholder={'Search for...'}
            />
            <button className={style.search_submit} type="submit">
              <img className="" src={search_icon} alt="search-icon" />
            </button>
          </form>
          <div className={style.account}>
            <Button
              width={138}
              height={54}
              borderRadius={30}
              text={auth ? 'Profile' : 'Get started'}
            ></Button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
