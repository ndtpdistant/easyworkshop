import { Form, Link } from 'react-router-dom';
import useInput from '../../hooks/useInput';

import Button from '../../components/Button';
import Input from '../../components/Input';

import style from './EditProfile.module.scss';

const EditProfile = () => {
  const firstName = useInput('', { isEmpty: true, maxLengthError: 254 });
  const lastName = useInput('', { isEmpty: true, maxLengthError: 254 });
  const about = useInput('', { isEmpty: true, maxLengthError: 254 });
  return (
    <div className={style.wrapper}>
      <Form method="post" id="contact-form" className={style.editForm}>
        <div className={style.nav}>
          <button type="button" className={style.cancel}>
            <span></span> <span></span>
          </button>
          <div className={style.title}>Edit profile</div>
          <Button inlineStyle={{ width: '81px', height: '37px' }} type="submit">
            Done
          </Button>
        </div>
        <p>
          <span className={style.label}>First name</span>
          <div
            className={style.errorContainer}
            style={{ justifyContent: 'center' }}
          >
            {firstName.isDirty && firstName.firstNameError && (
              <div style={{ color: 'red' }}>Incorrect first name</div>
            )}
          </div>
          <Input
            placeholder={'Enter your last name'}
            name={'firstName'}
            onChange={(e) => {
              firstName.onChange(e);
              // handleChange(e);
            }}
            onBlur={(e) => firstName.onBlur(e)}
            value={firstName.value}
            type={'text'}
          />
        </p>
        <p>
          <span className={style.label}>Last name</span>
          <div
            className={style.errorContainer}
            style={{ justifyContent: 'center' }}
          >
            {lastName.isDirty && lastName.lastNameError && (
              <div style={{ color: 'red' }}>Incorrect last name</div>
            )}
          </div>
          <Input
            placeholder={'Enter your last name'}
            name={'lastName'}
            onChange={(e) => {
              lastName.onChange(e);
              // handleChange(e);
            }}
            onBlur={(e) => lastName.onBlur(e)}
            value={lastName.value}
            type={'text'}
          />
        </p>
        <p>
          <span className={style.label}>About</span>
          <div
            className={style.errorContainer}
            style={{ justifyContent: 'center' }}
          >
            {about.isDirty && about.aboutError && (
              <div style={{ color: 'red' }}>Incorrect last name</div>
            )}
          </div>
          <Input
            placeholder={'Enter your about'}
            name={'about'}
            onChange={(e) => {
              about.onChange(e);
              // handleChange(e);
            }}
            onBlur={(e) => about.onBlur(e)}
            value={about.value}
            type={'text'}
          />
        </p>
      </Form>
    </div>
  );
};

export default EditProfile;
