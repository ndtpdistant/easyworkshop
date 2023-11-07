import Button from '../../components/Button';
import Input from '../../components/Input';
import * as style from './Auth.module.scss';

import image from '../../assets/images/cb.webp'

const Auth = () => {


  // const title = signIn ? 'Glad to see you' : 'Join us today';
  // const btnText = signIn ? 'Sign in' : 'Create an account';
  // const link = signIn ? (
  //   <div className={style.link}>
  //     Do not have an account? <br />
  //     <a href="">Sign up.</a>
  //   </div>
  // ) : (
  //   <div className={style.link}>
  //     Already have an account <br /> <a href="">Sign in.</a>
  //   </div>
  // );
  // const inputs = signIn ? null : (
  //   <>
  //     <Input
  //       className={style.authInput}
  //       placeholder={'Your first name'}
  //       type={'text'}
  //     ></Input>
  //     <Input
  //       className={style.authSubmit}
  //       placeholder={'Your last name'}
  //       type={'text'}
  //     ></Input>
  //   </>
  // );

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.titleWrapper}>
          <h1>{title}</h1>
          <h2>
            Lorem ipsum dolor sit amet consectetur adipiscing elit nulla
            adipiscing tincidunt interdum tellus du.
          </h2>
        </div>
        <div className={style.authWrapper}>
          <img src={image} alt="3d model" className={style.img} />
          <form className={style.authWorm}>
            {inputs}
            <Input
              className={inputClassName}
              placeholder={'Email'}
              type={'email'}
            ></Input>
            <Input
              className={inputClassName}
              placeholder={'Password'}
              type={'password'}
            ></Input>
            <Button
              text={btnText}
              className={btnClassName}
              type={'submit'}
            ></Button>
            {link}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
