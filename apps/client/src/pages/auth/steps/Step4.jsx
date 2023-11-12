import ArrowLeft from '../../../assets/icons/ArrowLeft';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import style from './Steps.module.scss';

const Step4 = ({ onPrev, onNext, email, handleChange }) => {
  return (
    <div className={`${style.step4}`}>
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
        <div className={style.title}>Enter your email address</div>
        <div
          className={style.errorContainer}
          style={{ justifyContent: 'center' }}
        >
          {email.isDirty && email.emailError && (
            <div style={{ color: 'red' }}>Incorrect email</div>
          )}
        </div>
        <Input
          placeholder={'Enter your email'}
          name={'email'}
          onChange={(e) => {
            email.onChange(e);
            handleChange(e);
          }}
          onBlur={(e) => email.onBlur(e)}
          value={email.value}
          type={'email'}
        />
        <Button
          onClick={onNext}
          disabled={!email.inputValid}
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

export default Step4;
