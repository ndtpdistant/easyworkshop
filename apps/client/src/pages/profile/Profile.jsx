import { redirect, useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EasyworkshopService from '../../services/EasyworkshopService';

import Card from '../../components/Card';

import style from './Profile.module.scss';
import Pencil from '../../assets/icons/Pencil';

export async function loader({ params }) {
  const easyworkshopService = new EasyworkshopService();
  const profile = await easyworkshopService.getProfile(params.profileId);
  return profile;
}

const Profile = () => {
  const [mobile, setMobile] = useState(false);
  const [profile, setProfile] = useState({});
  const [isYours, setYours] = useState(false);
  const receivedProfile = useLoaderData();

  useEffect(() => {
    setProfile(receivedProfile);
    if (window.screen.width < 480) {
      setMobile(true);
    }
  }, []);

  return (
    <div className={style.wrapper}>
      {!mobile ? null : (
        <div className={style.userContainer}>
          <img
            src={profile.background}
            alt="profile backgroung"
            className={style.profileBackground}
          />
          <img
            src={profile.img}
            alt="profile img"
            className={style.profileImg}
          />
          <div className={style.nameWrapper}>
            <div></div>
            <div className={style.profileName}>
              {profile.firstName} {profile.lastName}
            </div>
            {isYours ? (
              <button onClick={() => redirect('/edit')}>
                <Pencil />
              </button>
            ) : (
              <button></button>
            )}
          </div>
          <div className={style.profileAbout}>{profile.about} </div>
        </div>
      )}
      <div className={style.container}>
        {mobile ? null : (
          <div className={style.userContainer}>
            <img
              src={profile.background}
              alt="profile backgroung"
              className={style.profileBackground}
            />
            <img
              src={profile.img}
              alt="profile img"
              className={style.profileImg}
            />
            <div className={style.nameWrapper}>
              <div></div>
              <div className={style.profileName}>
                {profile.firstName} {profile.lastName}
              </div>
              {isYours ? (
                <button onClick={() => redirect('/edit')}>
                  <Pencil />
                </button>
              ) : (
                <button></button>
              )}
            </div>
            <div className={style.profileAbout}>{profile.about} </div>
          </div>
        )}
        <div className={style.itemsContainer}>
          {profile.cardList
            ? profile.cardList.map((card) => (
                <Card
                  key={card.id}
                  title={card.title}
                  img={card.img}
                  id={card.id}
                  profileId={card.profileId}
                  profileName={card.profileName}
                  profileImg={card.profileImg}
                  description={card.description}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
