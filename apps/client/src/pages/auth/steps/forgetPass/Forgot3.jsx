import ArrowLeft from '../../../../assets/icons/ArrowLeft';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

import style from '../Steps.module.scss';

const Forgot3 = ({ onPrev, onNext, password, handleChange, handleForm }) => {
  return (
    <div className={`${style.forgot3}`}>
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
        <div className={style.title}>Choose a password</div>
        <div className={style.subtitle}>
          Create a password at least with 6 chaeacters. It should be something
          others couldn’t guess.
        </div>

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
        />
        <Button
          onClick={() => {
            onNext();
            // handleForm();
          }}
          disabled={!password.inputValid}
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

export default Forgot3;
