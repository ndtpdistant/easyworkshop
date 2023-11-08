import Button from '../../components/Button';
import Input from '../../components/Input';
import style from './Auth.module.scss';

import image from '../../assets/images/cb.webp';
import { useEffect, useState } from 'react';

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;

        case 'maxLength':
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;

        case 'email':
          const emailRegex =
            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
          emailRegex.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;

        case 'password':
          const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,50}$/;
          passwordRegex.test(String(value))
            ? setPasswordError(false)
            : setPasswordError(true);
          break;

        case 'username':
          const usernameRegex =
            /^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
          usernameRegex.test(String(value))
            ? setUsernameError(false)
            : setUsernameError(true);
          break;

        case 'login':
          const loginRegex = new RegExp(
            /(^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.])$)/,
          );
          loginRegex.test(String(value))
            ? setLoginError(false)
            : setLoginError(true);

        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true);
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (
      isEmpty ||
      minLengthError ||
      maxLengthError ||
      passwordError ||
      usernameError ||
      emailError ||
      loginError
    ) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [
    isEmpty,
    minLengthError,
    maxLengthError,
    passwordError,
    usernameError,
    emailError,
    loginError,
  ]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    passwordError,
    usernameError,
    emailError,
    loginError,
    inputValid,
  };
};

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);

  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // when user leaves the input
  const onBlur = (e) => {
    setDirty(true);
  };

  return {
    value,
    isDirty,
    onChange,
    onBlur,
    ...valid,
  };
};

const Auth = () => {
  //only for login
  const login = useInput('', { isEmpty: true, login: true });
  //only for registration
  const email = useInput('', { isEmpty: true, email: true });
  const username = useInput('', { isEmpty: true, username: true });
  const firstName = useInput('', { isEmpty: true, maxLengthError: 254 });
  const lastName = useInput('', { isEmpty: true, maxLengthError: 254 });
  //for both
  const password = useInput('', { isEmpty: true, password: true });

  const [isReg, setReg] = useState(true);

  const handleForm = (e) => {
    event.preventDefault();
    if (isReg) {
      const data = {
        email: email,
        username: username,
        first_name: firstName,
        last_name: lastName,
        password: password,
      };
      console.log(data);
    } else {
      const data = {
        login: login,
        password: password,
      };
      console.log(data);
    }
    console.log('submit');
  };

  // return (
  //   <>
  //     {email.isDirty && email.isEmpty && <div>Email can't be empty</div>}
  //     {email.isDirty && email.emailError && <div>Incorrect email</div>}
  //     <Input
  //       type={email}
  //       placeholder={'Enter your email'}
  //       onBlur={(e) => email.onBlur(e)}
  //       value={email.value}
  //       onChange={(e) => email.onChange(e)}
  //     />

  //     {password.isDirty && password.isEmpty && <div>Password can't be empty</div>}
  //     {password.isDirty && password.passwordError && <div>Incorrect password</div>}

  //     <Input
  //       type={password}
  //       placeholder={'Enter your password'}
  //       onBlur={(e) => password.onBlur(e)}
  //       value={password.value}
  //       onChange={(e) => password.onChange(e)}
  //     />

  //     {login.isDirty && login.isEmpty && <div>Login can't be empty</div>}
  //     {login.isDirty && login.loginError && <div>Incorrect login</div>}
  //     <Input
  //       type={login}
  //       placeholder={'Enter your login'}
  //       onBlur={(e) => login.onBlur(e)}
  //       value={login.value}
  //       onChange={(e) => login.onChange(e)}
  //     />

  //   </>
  // );

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.titleWrapper}>
          <h1>{isReg ? 'Join us today' : 'Glad to see you'}</h1>
          <h2>
            Lorem ipsum dolor sit amet consectetur adipiscing elit nulla
            adipiscing tincidunt interdum tellus du.
          </h2>
        </div>
        <div className={style.authWrapper}>
          <img src={image} alt="3d model" className={style.img} />
          <form className={style.authForm} onSubmit={handleForm}>
            {isReg ? (
              <>
                <Input
                  placeholder={'Enter your email'}
                  onChange={(e) => email.onChange(e)}
                  onBlur={(e) => email.onBlur(e)}
                  value={email.value}
                />
                <Input
                  placeholder={'Enter your username'}
                  onChange={(e) => username.onChange(e)}
                  onBlur={(e) => username.onBlur(e)}
                  value={username.value}
                />
                <Input
                  placeholder={'Enter your first name'}
                  onChange={(e) => firstName.onChange(e)}
                  onBlur={(e) => firstName.onBlur(e)}
                  value={firstName.value}
                />
                <Input
                  placeholder={'Enter your last name'}
                  onChange={(e) => lastName.onChange(e)}
                  onBlur={(e) => lastName.onBlur(e)}
                  value={lastName.value}
                />
                <Input
                  placeholder={'Enter your password'}
                  onChange={(e) => password.onChange(e)}
                  onBlur={(e) => password.onBlur(e)}
                  value={password.value}
                />
              </>
            ) : (
              <>
                <Input
                  placeholder={'Enter your login'}
                  onChange={(e) => login.onChange(e)}
                  onBlur={(e) => login.onBlur(e)}
                  value={login.value}
                />
                <Input
                  placeholder={'Enter your password'}
                  onChange={(e) => password.onChange(e)}
                  onBlur={(e) => password.onBlur(e)}
                  value={password.value}
                />
              </>
            )}

            <Button
              disabled={
                !email.inputValid || !password.inputValid || !login.inputValid
              }
              text={isReg ? 'Create an account' : 'Sign In'}
              type={'submit'}
            />
            <div className={style.link}>
              {isReg ? 'Already have an account' : 'Do not have an account?'}
              <a href="#" onClick={() => setReg(!isReg)}>
                <div>{isReg ? 'Sign in.' : 'Sign up.'}</div>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
