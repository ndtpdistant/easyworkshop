import { useState } from "react";
import logo from "../../assets/icons/easy-workshop-logo-black.svg";
import search_icon from "../../assets/icons/search-icon.svg";

import * as style from "./Navbar.module.scss";

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
            <input
              className={style.search_input}
              type="text"
              placeholder="Search for..."
            />
            <button className={style.search_submit} type="submit">
              <img className="" src={search_icon} alt="search-icon" />
            </button>
          </form>
          <div className={style.account}>
            <button
              className={style.account_btn}
              style={{ display: auth ? "none" : "block" }}
            >
              Get started
            </button>
            <button
              className={style.account_btn}
              style={{ display: auth ? "block" : "none" }}
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
