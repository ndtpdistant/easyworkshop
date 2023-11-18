import { useState } from 'react';

import ArrowLeft from '../../../../assets/icons/ArrowLeft';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

import style from '../Steps.module.scss';

const Forgot2 = ({ onPrev, onNext, verificationCode, handleChange, handleForm }) => {
  const [disabled, setDisabled] = useState(true);

  const validateCode = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    if (e.target.value.length === 6) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <div className={`${style.step5}`}>
      <div className={style.nav}>
        <button
          className={`${style.transparent} ${style.back}`}
          onClick={onPrev}
        >
          <ArrowLeft />
        </button>
        <p className={style.suptitle}>Find Your Account</p>
      </div>
      <div className={style.wrapper}>
        <div className={style.title}>
          Enter the code we sent to <br />{' '}
          <div className={style.defaultText}>{verificationCode.value}</div>
        </div>
        <div className={style.subtitle}>
          We sent 6 digit code to your email address
        </div>
        <Input
          placeholder={'Enter code'}
          name={'code'}
          maxLen={6}
          onChange={(e) => {
            validateCode(e);
            handleChange(e);
          }}
          type={'text'}
        />
        <Button
          onClick={() => {
            onNext();
            // handleForm();
          }}
          disabled={disabled}
          inlineStyle={{
            width: '300px',
            height: '40px',
            borderRadius: '15px',
            background:
              'linear-gradient(92deg, #384CFF 1.39%, #00A3FF 101.04%)',
            boxShadow: '0px 4px 9px 0px rgba(28, 120, 255, 0.50)',
            marginTop: '72px',
          }}
        >
          Find Your Account
        </Button>
      </div>
    </div>
  );
};

export default Forgot2;
