import { useState, useEffect } from 'react';
import logo from '../../assets/icons/easy-workshop-logo-black.svg';

import * as style from './Navbar.module.scss';

const Navbar = (props) => {
  const [auth, setAuth] = useState(false);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className=''>
          <a href='/'>
            <img className={style.logo} src={logo} alt='' />
          </a>
        </div>
        <nav className={style.nav}>
          <ul className={style.menu}>
            <li className={style.menu_item}>
              <a href='/'>Home</a>
            </li>
            <li className={style.menu_item}>
              <a href='#'>About</a>
            </li>
            <li className={style.menu_item}>
              <a href='#'>Contact</a>
            </li>
          </ul>
          <form className={style.search} method='' action=''>
            <input
              className={style.search_input}
              type='text'
              placeholder='Search for...'
            />
            <button className={style.search_submit} type='submit'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8.16671 14.5631C11.8486 14.5631 14.8334 11.5783 14.8334 7.89637C14.8334 4.21444 11.8486 1.22965 8.16671 1.22965C4.48479 1.22965 1.5 4.21444 1.5 7.89637C1.5 11.5783 4.48479 14.5631 8.16671 14.5631Z'
                  stroke='#BCBACD'
                  strok-width='1.50001'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M16.5003 16.2297L12.8752 12.6047'
                  stroke='#BCBACD'
                  strokeWidth='1.50001'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </form>
          <div className={style.account}>
            <button
              className={style.account_btn}
              style={{ display: auth ? 'none' : 'block' }}
            >
              Get started
            </button>
            <button
              className={style.account_btn}
              style={{ display: auth ? 'block' : 'none' }}
            >
              Profile
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
