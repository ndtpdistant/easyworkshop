import Button from '../../../components/Button';

import style from './Steps.module.scss';
import authStep1 from '../../../assets/images/authStep1.jpg';

const Step1 = ({ onNext, setReg, isReg, onNextForgot, clearData }) => {
  return (
    <div className={`${style.wrapper} ${style.step1}`} style={{height: '100vh'}}>
      <img src={authStep1} alt="step 1" />
      <div className={style.title}>
        {isReg ? 'Join Easyworkshop' : 'Log in Easyworkshop'}
      </div>
      <div className={style.subtitle}>
        We’ll help you <br />
        {isReg
          ? `log into your account in a few easy steps.`
          : 'create a new account in a few easy steps.'}
      </div>
      <Button
        inlineStyle={{
          width: '300px',
          height: '40px',
          borderRadius: '15px',
          background: 'linear-gradient(92deg, #384CFF 1.39%, #00A3FF 101.04%)',
          boxShadow: '0px 4px 9px 0px rgba(28, 120, 255, 0.50)',
          marginTop: '52px',
        }}
        onClick={onNext}
      >
        Next
      </Button>

      {isReg ? null : (
        <button
          onClick={onNextForgot}
          className={`${style.transparent} ${style.forgot}`}
        >
          Forgot your password?
        </button>
      )}

      <button
        className={style.transparent}
        onClick={() => {
          clearData();
          setReg(!isReg);
        }}
        type='reset'
      >
        {isReg ? 'Already have an account?' : 'Dont have an account?'}
      </button>
    </div>
  );
};

export default Step1;
