import ArrowLeft from '../../../assets/icons/ArrowLeft';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import style from './Steps.module.scss';

const Step3 = ({ onPrev, onNext, isReg, username, password, handleChange }) => {
  return (
    <div className={`${style.step3}`}>
      <div className={style.nav}>
        <button
          className={`${style.transparent} ${style.back}`}
          onClick={onPrev}
        >
          <ArrowLeft />
        </button>
        <p className={style.suptitle}>
          {isReg ? 'Create account' : 'Log into account'}
        </p>
      </div>
      <div className={style.wrapper}>
        <div className={style.title}>
          {isReg ? 'Enter your  username' : 'Enter your password'}
        </div>

        {isReg ? (
          <>
            <div
              className={style.errorContainer}
              style={{ justifyContent: 'center' }}
            >
              {username.isDirty && username.usernameError && (
                <div style={{ color: 'red' }}>Incorrect username</div>
              )}
            </div>
            <Input
              placeholder={'Enter your username'}
              name={'username'}
              onChange={(e) => {
                username.onChange(e);
                handleChange(e);
              }}
              onBlur={(e) => username.onBlur(e)}
              value={username.value}
              type={'text'}
            />
          </>
        ) : (
          <>
            <div
              className={style.errorContainer}
              style={{ justifyContent: 'center' }}
            >
              {password.isDirty && password.passwordError && (
                <div style={{ color: 'red' }}>Incorrect password</div>
              )}
            </div>
            <Input
              placeholder={'Enter your password'}
              name={'password'}
              onChange={(e) => {
                password.onChange(e);
                handleChange(e);
              }}
              onBlur={(e) => password.onBlur(e)}
              value={password.value}
              type={'password'}
              // inlineStyle={{ width: '310px' }}
            />
          </>
        )}
        <Button
          onClick={isReg ? onNext : onNext}
          // onClick={isReg ? onNext : null}
          disabled={isReg ? !username.inputValid : !password.inputValid}
          type={isReg ? null : 'submit'}
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
          {isReg ? 'Next' : 'Find Your Account'}
        </Button>
      </div>
    </div>
  );
};

export default Step3;
