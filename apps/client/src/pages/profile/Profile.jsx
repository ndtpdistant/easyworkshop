import { useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EasyworkshopService from '../../services/EasyworkshopService';

import Card from '../../components/Card';

import style from './Profile.module.scss';

import { getBackgroundPicture, getProfile, getProfilePicture, changeProfilePicture } from '../../services/apiProfile';
import { getItem } from '../../services/apiItem';

export async function loader({ params }) {
  const profile = await getProfile(params.profileId);
  // const profilePicture = await getProfilePicture(params.profileId+1);
  const profilePicture = await getProfilePicture(2);
  const backgroundPicture = await getBackgroundPicture(params.profileId);
  return { profile, profilePicture, backgroundPicture };
}

const Profile = () => {
  const [profile, setProfile] = useState({});
  const receivedProfile = useLoaderData();
  const [profilePicture, setProfilePicture] = useState(null);
  const [backgroundPicture, setBackgroundPicture] = useState(null);
  const [profileImageType, setProfileImageType] = useState(null);
  const [backgroundImageType, setBackgroundImageType] = useState(null);

  const backgroundStockLink = 'https://t3.ftcdn.net/jpg/02/77/30/98/360_F_277309825_h8RvZkoyBGPDocMtippdfe3497xTrOXO.jpg';

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //   const { base64, type } = await getProfilePicture(2);
    //   setProfilePicture(base64);
    //   setImageType(type); 
    //   } catch (error) {
    //     setProfilePicture(null);
    //     setImageType(null);
    //   }
    // };
    // fetchData();
    // const fetchItem = async () => {
    //   getItem(2)
    // };
  }, []);

  useEffect(() => {
    setProfile(receivedProfile.profile);
    setProfilePicture(receivedProfile.profilePicture.base64)
    setProfileImageType(receivedProfile.profilePicture.type)
    setBackgroundPicture(receivedProfile.backgroundPicture?.base64)
    setBackgroundImageType(receivedProfile.backgroundPicture?.type)
  }, [receivedProfile])

  // img sample
  // {profilePicture && imageType && (
  //   <img
  //     src={`data:${imageType};base64,${profilePicture}`}
  //     alt="Profile"
  //     style={{ width: '150px', height: '150px' }}
  //   />
  // )}

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.userContainer}>
          <img
            src={backgroundPicture && backgroundImageType ? `data:${backgroundImageType};base64,${backgroundPicture}` : backgroundStockLink}
            alt="profile backgroung"
            className={style.profileBackground}
          />
          <img
            src={profilePicture && profileImageType ? `data:${profileImageType};base64,${profilePicture}` : backgroundStockLink}
            alt="profile backgroung"
            className={style.profileImg}
          />
          <div className={style.profileName}>
            {profile.first_name} {profile.last_name}
          </div>
          <div className={style.profileNickname}>{profile.username}</div>
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
