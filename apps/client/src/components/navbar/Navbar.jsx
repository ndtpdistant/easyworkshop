import { useState, useEffect } from 'react';
import { Form, Link } from 'react-router-dom';

import Input from '../Input';
import Button from '../Button';
import NavbarMobile from './NavbarMobile';

import logo from '../../assets/icons/easy-workshop-logo-black.svg';
import search_icon from '../../assets/icons/search-icon.svg';
import style from './Navbar.module.scss';

const Navbar = ({ mobile, setName }) => {
  const [query, setQuery] = useState('');
  const [value, setValue] = useState('');
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setName(query);
  }, [query]);

  return (
    <>
      {mobile ? (
        <NavbarMobile setName={setName} />
      ) : (
        <div className={style.wrapper}>
          <div className={style.container}>
            <div>
              <Link to={'/'}>
                <img className={style.logo} src={logo} alt="easy workshop" />
              </Link>
            </div>
            <nav className={style.nav}>
              <ul className={style.menu}>
                <li className={style.menu_item}>
                  <Link to={'/'}>Home</Link>
                </li>
                <li className={style.menu_item}>
                  <Link to={'/about'}>About</Link>
                </li>
                <li className={style.menu_item}>
                  <Link to={'/favorite'}>Liked by you</Link>
                </li>
                <li className={style.menu_item}>
                  <Link to={'/item/add'}>Add model</Link>
                </li>
              </ul>
              <Form
                className={style.search}
                method="get"
                onSubmit={() => setQuery(value)}
                role="search"
              >
                <Input
                  placeholder={'Search for...'}
                  type={'search'}
                  id={'q'}
                  name={'q'}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  inlineStyle={{
                    width: '340px',
                    height: '46px',
                    borderRadius: '50px',
                    paddingLeft: '25px',
                    fontSize: '16px',
                  }}
                />
                <button className={style.search_submit} type="submit">
                  <img className="" src={search_icon} alt="search-icon" />
                </button>
              </Form>
              <div className={style.account}>
                <Link to="auth">
                  <Button
                  // inlineStyle={{
                  //   width: '138px',
                  //   height: '54px',
                  //   borderRadius: '30px',
                  // }}
                  >
                    {auth ? 'Profile' : 'Get started'}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
