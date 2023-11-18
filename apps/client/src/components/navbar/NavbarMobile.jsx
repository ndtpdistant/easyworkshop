import { useState, useEffect, useDeferredValue } from 'react';
import { Link, Form, useLocation } from 'react-router-dom';

import Input from '../Input';

import logo from '../../assets/icons/easy-workshop-logo-black.svg';
import SearchIconMobile from '../../assets/icons/SearchIconMobile';
import user from '../../assets/icons/User.svg';
import style from './NavbarMobile.module.scss';

// export async function loader({ request }) {
//   const url = new URL(request.url);
//   const q = url.searchParams.get('q');
//   const contacts = await getContacts(q);
//   return { contacts };
// }

const NavbarMobile = ({ setName }) => {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [auth, setAuth] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.className = isMenuOpen ? 'overflow-hidden' : '';
    document.body.className = isMenuOpen ? 'overflow-hidden' : '';
  }, [isMenuOpen]);

  // useEffect(() => {
  //   setName(deferredQuery);
  // }, [deferredQuery]);

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
        style={isMenuOpen ? null : { height: 'inherit' }}
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
            <Link
              to={'/'}
              onClick={() =>
                prevState === true
                  ? setMenuOpen((prevState) => !prevState)
                  : null
              }
            >
              <img className={style.logo} src={logo} alt="easy workshop" />
            </Link>
          </div>
          <div className={style.account}>
            <Link to={auth ? 'profile' : 'auth'}>
              <img className={style.profile} src={user} alt="user" />
            </Link>
          </div>
        </nav>
        {isMenuOpen ? null : (
          <Form className={style.search} method="get" action="" role="search">
            <Input
              placeholder={'Search for...'}
              type={'search'}
              id={'q'}
              name={'q'}
              onChange={(e) => {
                setQuery(e.target.value);
                setName(deferredQuery);
              }}
            />
            <button className={style.search_submit} type="submit">
              <SearchIconMobile />
            </button>
          </Form>
        )}
      </div>
      {isMenuOpen ? (
        <ul className={style.burgeList}>
          <div className={style.burgerItem}>
            <Link
              to={'/'}
              onClick={() => setMenuOpen((prevState) => !prevState)}
            >
              Home
            </Link>
          </div>
          <div className={style.burgerItem}>
            <Link
              to={'/'}
              onClick={() => setMenuOpen((prevState) => !prevState)}
            >
              About
            </Link>
          </div>
          <div className={style.burgerItem}>
            <Link
              to={'/item/add'}
              onClick={() => setMenuOpen((prevState) => !prevState)}
            >
              Add model
            </Link>
          </div>
          <div className={style.burgerItem}>
            <Link
              to={'/favorite'}
              onClick={() => setMenuOpen((prevState) => !prevState)}
            >
              Liked by you
            </Link>
          </div>
        </ul>
      ) : null}
    </div>
  );
};

export default NavbarMobile;
