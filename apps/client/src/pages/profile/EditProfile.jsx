import { Form, Link, useLoaderData, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import EasyworkshopService from '../../services/EasyworkshopService';

import Button from '../../components/Button';
import EditProfileDropzone from './EditProfileDropzone';
import Input from '../../components/Input';

import style from './EditProfile.module.scss';
import { getProfile } from '../../services/apiProfile';

export async function loader({ params }) {
  const profile = await getProfile(params.profileId);
  return profile;
}

const EditProfile = () => {
  const navigation = useNavigate();
  const [profileImg, setProfileImg] = useState('');
  const [profileBackground, setProfileBackground] = useState('');
  const [mobile, setMobile] = useState(false);
  const [profile, setProfile] = useState({});
  const [isYours, setYours] = useState(false);
  const receivedProfile = useLoaderData();

  const firstName = useInput('', { isEmpty: true, maxLengthError: 254 });
  const lastName = useInput('', { isEmpty: true, maxLengthError: 254 });
  const about = useInput('', { isEmpty: true, maxLengthError: 254 });

  useEffect(() => {
    setProfile(receivedProfile);
    if (window.screen.width < 480) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    console.log(profileImg);
    console.log(profileBackground);
  }, [profileBackground, profileImg]);

  return (
    <div className={style.wrapper}>
      <div className={style.nav}>
        <button onClick={() => navigation(-1)} type="button" className={style.cancel}>
          <span></span> <span></span>
        </button>
        <div className={style.title}>Edit profile</div>
        <Button inlineStyle={{ width: '81px', height: '37px' }} type="submit">
          Done
        </Button>
      </div>
      <div className={style.container}>
        <div className={style.userContainer}>
          <EditProfileDropzone
            src={profile?.background}
            alt={'profile background'}
            itemClass={style.profileBackground}
            setImage={setProfileBackground}
          />
          <EditProfileDropzone
            src={profile?.img}
            alt={'profile img'}
            itemClass={style.profileImg}
            setImage={setProfileImg}
          />
          {/* <div {...getRootProps()} className={style.profileBackground}>
            {files.length ? (
              <img
                src={files[0]?.preview}
                alt="profile backgroung"
                className={style.profileBackground}
              />
            ) : (
              <img
                src={profile?.background}
                alt="profile backgroung"
                className={style.profileBackground}
              />
            )}
            <input {...getInputProps()} />
            <Camera />
          </div> */}
          {/* <div {...getRootProps()} className={style.profileImg}>
            {files.length ? (
              <img
                src={files[0]?.preview}
                alt="profile img"
                className={style.profileImg}
              />
            ) : (
              <img
                src={profile?.img}
                alt="profile img"
                className={style.profileImg}
              />
            )}
            <input {...getInputProps()} />
            <Camera />
          </div> */}
          <div className={style.nameWrapper}>
            <div></div>
            <div className={style.profileName}>
              {profile?.firstName} {profile?.lastName}
            </div>
            {isYours ? (
              <button onClick={() => redirect('/edit')}>
                <Pencil />
              </button>
            ) : (
              <button></button>
            )}
          </div>
          <div className={style.profileAbout}>{profile?.about} </div>
        </div>
        <Form method="post" id="contact-form" className={style.editForm}>
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
    </div>
  );
};

export default EditProfile;
