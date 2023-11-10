import { useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react'
import EasyworkshopService from '../../services/EasyworkshopService';

import Card from '../../components/Card';

import style from './Profile.module.scss';

export async function loader({ params }) {
  const easyworkshopService = new EasyworkshopService();
  const profile = await easyworkshopService.getProfile(params.profileId);
  return profile;
}

const Profile = () => {
  const [profile, setProfile] = useState({});
  const receivedProfile = useLoaderData();

  useEffect(() => {
    setProfile(receivedProfile);
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.userContainer}>
            <img src={profile.background} alt="profile backgroung" className={style.profileBackground} />
            <img src={profile.img} alt="profile img" className={style.profileImg}/>
            <div className={style.profileName}>{profile.firstName} {profile.lastName}</div>
            <div className={style.profileNickname}>{profile.nickname}</div>
        </div>
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
              />
            ))
          : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
