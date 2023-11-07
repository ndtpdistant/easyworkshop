import Button from '../../components/Button';
import Input from '../../components/Input';

import * as style from './Auth.module.scss';

const Auth = ({ rndImg, signIn }) => {
  const inputClassName = style.auth_input;
  const btnClassName = style.auth_submit;

  const title = signIn ? 'Glad to see you' : 'Join us today';
  const btnText = signIn ? 'Sign in' : 'Create an account';
  const link = signIn ? (
    <div className={style.link}>
      Do not have an account? <br />
      <a href="">Sign up.</a>
    </div>
  ) : (
    <div className={style.link}>
      Already have an account <br /> <a href="">Sign in.</a>
    </div>
  );
  const inputs = signIn ? null : (
    <>
      <Input
        className={inputClassName}
        placeholder={'Your first name'}
        type={'text'}
      ></Input>
      <Input
        className={inputClassName}
        placeholder={'Your last name'}
        type={'text'}
      ></Input>
    </>
  );

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.title_wrapper}>
          <h1>{title}</h1>
          <h2>
            Lorem ipsum dolor sit amet consectetur adipiscing elit nulla
            adipiscing tincidunt interdum tellus du.
          </h2>
        </div>
        <div className={style.auth_wrapper}>
          <img src={rndImg} alt="3d model" className={style.rnd_img} />
          <form className={style.auth_form}>
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
