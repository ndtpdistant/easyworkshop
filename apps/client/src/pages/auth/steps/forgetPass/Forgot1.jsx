import ArrowLeft from '../../../../assets/icons/ArrowLeft';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

import style from '../Steps.module.scss';

const Forgot1 = ({ onPrev, onNext, login, handleChange }) => {
    return (
        <div className={`${style.forgot1}`}>
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
            <div className={style.title}>Enter your email or username</div>
            <div
              className={style.errorContainer}
              style={{ justifyContent: 'center' }}
            >
              {login.isDirty && login.loginError && (
                <div style={{ color: 'red' }}>Incorrect login</div>
              )}
            </div>
            <Input
              placeholder={'Enter your login'}
              name={'login'}
              onChange={(e) => {
                login.onChange(e);
                handleChange(e);
              }}
              onBlur={(e) => login.onBlur(e)}
              value={login.value}
              type={'login'}
            />
            <Button
              onClick={onNext}
              disabled={!login.inputValid}
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
      )
}

export default Forgot1;