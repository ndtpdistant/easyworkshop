import logo from '../../assets/icons/easy-workshop-logo-black.svg';

import style from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className="">
          <a href="/">
            <img className={style.logo} src={logo} alt="easy workshop" />
          </a>
        </div>
        <div className={style.copyright}>
          Copyright © 2023 Matsvei Shulman & Roman Novikov | All Rights Reserved{' '}
        </div>
      </div>
    </div>
  );
};

export default Footer;
