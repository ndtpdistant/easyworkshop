import { useState } from 'react';

import ArrowLeft from '../../../assets/icons/ArrowLeft';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import style from './Steps.module.scss';

const Step6 = ({
  onPrev,
  onNext,
  code,
  handleChange,
  handleForm,
  // wrongCode,
}) => {

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
        <p className={style.suptitle}>Create account</p>
      </div>
      <div className={style.wrapper}>
        <div className={style.title}>
          Enter the code we sent to <br />{' '}
          <div className={style.defaultText}>{code}</div>
        </div>
        <div className={style.subtitle}>
          We sent 6 digit code to your email address
        </div>
        {/* {wrongCode && <p style={{marginTop: '10px', color: 'red'}}>Wrong verification code</p>} */}
        <Input
          placeholder={'Enter code'}
          name={'code'}
          maxLen={6}
          onChange={(e) => {
            validateCode(e);
            handleChange(e);
          }}
          //     password.onChange(e);
          //     handleChange(e);
          //   }}
          //   onBlur={(e) => password.onBlur(e)}
          //   value={password.value}
          type={'text'}
        />
        <Button
          disabled={disabled}
          onClick={() => {
            onNext();
            // handleForm();
          }}
          //   disabled={!password.inputValid}
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
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step6;
