import ArrowLeft from '../../../assets/icons/ArrowLeft';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import style from './Steps.module.scss';

const Step2 = ({
  onPrev,
  onNext,
  isReg,
  firstName,
  lastName,
  login,
  handleChange,
}) => {
  return (
    <div className={`${style.step2}`}>
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
          {isReg ? 'What’s your name?' : 'Enter your email address'}
        </div>
        <div className={style.subtitle}>
          {isReg ? `Enter the name you use in real life.` : null}
        </div>

        {isReg ? (
          <>
            <div className={style.errorContainer}>
              {firstName.isDirty && firstName.isEmpty ? (
                <div style={{ color: 'red' }}>Incorrect first name</div>
              ) : (
                <div></div>
              )}
              {lastName.isDirty && lastName.isEmpty ? (
                <div style={{ color: 'red' }}>Incorrect last name</div>
              ) : (
                <div></div>
              )}
            </div>
            <div className={style.inputContainer}>
              <div className={style.labelContainer}>
                <label htmlFor="firstName" className={style.subtitle}>
                  First Name
                </label>
                <Input
                  placeholder={''}
                  id={'firstName'}
                  onChange={(e) => {
                    firstName.onChange(e);
                    handleChange(e);
                  }}
                  name={'firstName'}
                  onBlur={(e) => firstName.onBlur(e)}
                  value={firstName.value}
                />
              </div>
              <div className={style.labelContainer}>
                <label htmlFor="lastName" className={style.subtitle}>
                  Last Name
                </label>
                <Input
                  id={'lastName'}
                  placeholder={''}
                  onChange={(e) => {
                    lastName.onChange(e);
                    handleChange(e);
                  }}
                  name={'lastName'}
                  onBlur={(e) => lastName.onBlur(e)}
                  value={lastName.value}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={style.errorContainer}
              style={{ justifyContent: 'center' }}
            >
              {login.isDirty && login.loginError && (
                <div style={{ color: 'red' }}>Incorrect username or email</div>
              )}
            </div>
            <Input
              placeholder={'Enter your username or email'}
              name={'login'}
              onChange={(e) => {
                login.onChange(e);
                handleChange(e);
              }}
              onBlur={(e) => login.onBlur(e)}
              value={login.value}
              type={'login'}
              inlineStyle={{ width: '310px' }}
            />
          </>
        )}
        <Button
          onClick={onNext}
          disabled={
            isReg ? !firstName.inputValid || !lastName.inputValid : !login.inputValid
          }
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

export default Step2;
