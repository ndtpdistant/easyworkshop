import useInput from '../../hooks/useInput';
import { useEffect, useState } from 'react';
import {
  Form,
  redirect,
  redirectDocument,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Forgot1 from './steps/forgetPass/Forgot1';
import Forgot2 from './steps/forgetPass/Forgot2';
import Forgot3 from './steps/forgetPass/Forgot3';

import image from '../../assets/images/cb.webp';
import style from './Auth.module.scss';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import Step6 from './steps/Step6';
import {
  forgotPassword,
  sendLoginData,
  sendRegistrationData,
  sendVerificationCode,
  verification,
} from '../../services/apiAuth';

//Проверить formData

const Auth = () => {
  const client = axios.create({
    baseURL: 'http://localhost:5050/api/auth',
  });

  const headers = {
    'Content-Type': 'application/json',
  };

  //only for login
  const login = useInput('', { isEmpty: true, login: true });
  //only for registration
  const email = useInput('', { isEmpty: true, email: true });
  const username = useInput('', { isEmpty: true, username: true });
  const firstName = useInput('', { isEmpty: true, maxLengthError: 254 });
  const lastName = useInput('', { isEmpty: true, maxLengthError: 254 });
  const verificationCode = useInput('', { isEmpty: true, maxLengthError: 6 });
  //for both
  const password = useInput('', { isEmpty: true, password: true });
  const navigate = useNavigate();

  const [isReg, setReg] = useState(true);
  const [mobileStep, setMobileStep] = useState(0);
  const [forgotStep, setForgotStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    e.persist();
    setFormData((formData) => {
      return {
        ...formData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const clearData = () => {
    setFormData({});
    login.clearValue();
    firstName.clearValue();
    lastName.clearValue();
    email.clearValue();
    password.clearValue();
    username.clearValue();
    verificationCode.clearValue();
  };

  useEffect(() => {
    if (window.screen.width < 480) {
      setMobileStep(1);
    }
  }, []);

  useEffect(() => {
    console.log(formData)
  }, [formData]);

  const nextRegStep = async () => {
    // console.log(formData)
    if (mobileStep == 3 && !isReg) {
      if (await sendLoginData(formData)) {
        navigate('/ ');
      } else {
        alert('Wrong login data!');

        window.location.reload(false);
      }
    } else {
      if (mobileStep == 5) {
        const response = await sendRegistrationData(formData)
        if(!response.data.status) {
          alert(response.data.message);
          window.location.reload();
        }
      }
      if (mobileStep == 6) {
        if(verification(formData)) {
          navigate('');
        } else {
          window.location.reload();
        }
      }
      setMobileStep((prevStep) => prevStep + 1);
    }
  };

  const prevRegStep = () => {
    setMobileStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleVerificationCode = async () => {
    const response = await forgotPassword(formData);
    return response;
  };

  const nextForgotStep = async () => {
    if (forgotStep == 1) {
      sendVerificationCode(formData);
    }
    if (forgotStep == 3) {
      alert(await handleVerificationCode());
    }
    setForgotStep((prevStep) => {
      if (forgotStep === 0) {
        clearData();
      }
      return prevStep + 1;
    });
    
  };

  const prevForgotStep = () => {
    setForgotStep((prevStep) => {
      if (forgotStep === 1) {
        clearData();
      }
      return prevStep - 1;
    });
  };

  const renrerMobileSteps = () => {
    switch (mobileStep) {
      case 1:
        switch (forgotStep) {
          case 1:
            return (
              <Forgot1
                onNext={nextForgotStep}
                onPrev={prevForgotStep}
                handleChange={handleChange}
                email={email}
              />
            );
            break;
          case 2:
            return (
              <Forgot2
                onNext={nextForgotStep}
                onPrev={prevForgotStep}
                handleChange={handleChange}
                verificationCode={verificationCode}
              />
            );
            break;
          case 3:
            return (
              <Forgot3
                onNext={nextForgotStep}
                onPrev={prevForgotStep}
                password={password}
                handleChange={handleChange}
              />
            );
            break;
          default:
            return (
              <Step1
                onNext={nextRegStep}
                onNextForgot={nextForgotStep}
                setReg={setReg}
                isReg={isReg}
                clearData={clearData}
              />
            );
            break;
        }
        break;
      case 2:
        return (
          <Step2
            onNext={nextRegStep}
            onPrev={prevRegStep}
            isReg={isReg}
            firstName={firstName}
            lastName={lastName}
            login={login}
            handleChange={handleChange}
          />
        );
        break;
      case 3:
        return (
          <Step3
            onNext={nextRegStep}
            onPrev={prevRegStep}
            isReg={isReg}
            username={username}
            password={password}
            handleChange={handleChange}
          />
        );
        break;
      case 4:
        return (
          <Step4
            onNext={nextRegStep}
            onPrev={prevRegStep}
            email={email}
            handleChange={handleChange}
          />
        );
        break;
      case 5:
        return (
          <Step5
            onNext={nextRegStep}
            onPrev={prevRegStep}
            password={password}
            handleChange={handleChange}
            handleForm={handleForm}
          />
        );
        break;
      case 6:
        return (
          <Step6
            onNext={nextRegStep}
            onPrev={prevRegStep}
            email={formData.email}
            handleChange={handleChange}
            handleForm={handleForm}
          />
        );
        break;
      default:
        return (
          <Step6
            onNext={nextRegStep}
            onPrev={prevRegStep}
            email={formData.email}
            handleChange={handleChange}
            handleForm={handleForm}
          />
        );
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (isReg) {
      const data = JSON.stringify({
        body: {
          email: formData.email,
          password: formData.password,
          verification_code: formData.code,
        },
      });
      client.post('verification', data, { headers: headers }).then((res) => {
        if (!res.data) {
          setWrongCode(true);
        } else {
          setWrongCode(false);
          localStorage.setItem('jwtToken', res.data.access_token);
          navigate('');
        }
      });
    }
  };

  return (
    <>
      {mobileStep ? (
        <Form onSubmit={handleForm} style={{ height: '100vh' }}>
          {renrerMobileSteps()}
        </Form>
      ) : (
        <div className={style.wrapper}>
          <div className={style.container}>
            <div className={style.titleWrapper}>
              <h1>{isReg ? 'Join us today' : 'Glad to see you'}</h1>
            </div>
            <div className={style.authWrapper}>
              <img src={image} alt="3d model" className={style.img} />
              <Form className={style.authForm} onSubmit={handleForm}>
                {isReg ? (
                  <>
                    {email.isDirty && email.emailError && (
                      <div style={{ color: 'red' }}>Incorrect email</div>
                    )}
                    {username.isDirty && username.usernameError && (
                      <div style={{ color: 'red' }}>Incorrect username</div>
                    )}
                    {firstName.isDirty && firstName.isEmpty && (
                      <div style={{ color: 'red' }}>Incorrect first name</div>
                    )}
                    {lastName.isDirty && lastName.isEmpty && (
                      <div style={{ color: 'red' }}>Incorrect last name</div>
                    )}
                    {password.isDirty && password.passwordError && (
                      <div style={{ color: 'red' }}>Incorrect password</div>
                    )}
                    <Input
                      placeholder={'Enter your email'}
                      onChange={(e) => email.onChange(e)}
                      onBlur={(e) => email.onBlur(e)}
                      value={email.value}
                      type={'email'}
                    />
                    <Input
                      placeholder={'Enter your username'}
                      onChange={(e) => username.onChange(e)}
                      onBlur={(e) => username.onBlur(e)}
                      value={username.value}
                    />
                    <Input
                      placeholder={'Enter your password'}
                      onChange={(e) => password.onChange(e)}
                      onBlur={(e) => password.onBlur(e)}
                      value={password.value}
                      type={'password'}
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
                    <Button
                      disabled={
                        !email.inputValid ||
                        !password.inputValid ||
                        !firstName.inputValid ||
                        !lastName.inputValid ||
                        !username.inputValid
                      }
                      type={'submit'}
                    >
                      {isReg ? 'Create an account' : 'Sign In'}
                    </Button>
                  </>
                ) : (
                  <>
                    {login.isDirty && login.loginError && (
                      <div style={{ color: 'red' }}>Incorrect login</div>
                    )}
                    {password.isDirty && password.passwordError && (
                      <div style={{ color: 'red' }}>Incorrect password</div>
                    )}
                    <Input
                      placeholder={'Enter your email or username'}
                      onChange={(e) => login.onChange(e)}
                      onBlur={(e) => login.onBlur(e)}
                      value={login.value}
                    />
                    <Input
                      placeholder={'Enter your password'}
                      onChange={(e) => password.onChange(e)}
                      onBlur={(e) => password.onBlur(e)}
                      value={password.value}
                      type={'password'}
                    />
                    <Button
                      disabled={!login.inputValid || !password.inputValid}
                      type={'submit'}
                    >
                      {isReg ? 'Create an account' : 'Sign In'}
                    </Button>
                  </>
                )}
                <div className={style.link}>
                  {isReg
                    ? 'Already have an account'
                    : 'Do not have an account?'}
                  <div onClick={() => setReg(!isReg)}>
                    <div>{isReg ? 'Sign in.' : 'Sign up.'}</div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
