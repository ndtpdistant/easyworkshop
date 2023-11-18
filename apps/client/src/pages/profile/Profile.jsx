import { useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EasyworkshopService from '../../services/EasyworkshopService';

import Card from '../../components/Card';

import style from './Profile.module.scss';

import { getBackgroundPicture, getProfile, getProfilePicture, changeProfilePicture } from '../../services/apiProfile';
import { getItem } from '../../services/apiItem';

export async function loader({ params }) {
  const easyworkshopService = new EasyworkshopService();
  const profile = await easyworkshopService.getProfile(params.profileId);
  return profile;
}

const Profile = () => {
  const [profile, setProfile] = useState({});
  const receivedProfile = useLoaderData();
  const [profilePicture, setProfilePicture] = useState(null);
  const [imageType, setImageType] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const { base64, type } = await getProfilePicture(2);
      setProfilePicture(base64);
      setImageType(type); 
      } catch (error) {
        setProfilePicture(null);
        setImageType(null);
      }
    };
    fetchData();
    const fetchItem = async () => {
      getItem(2)
    };
    // console.log(await getProfilePicture(2))
    // setProfile(receivedProfile);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    // try {

    // }
    // console.log(localStorage.getItem('token'))
    changeProfilePicture(localStorage.getItem('token'), file)
  }

  return (
    <div className={style.wrapper}>
      {profilePicture && imageType && (
        <img
          src={`data:${imageType};base64,${profilePicture}`}
          alt="Profile"
          style={{ width: '150px', height: '150px' }}
        />
      )}
      <form onSubmit={e => (handleSubmit(e))}>
        <input type="file" onChange={e => setFile(e.target.files[0])}/>
        <button type='submit'>submit</button>
      </form>
      <div className={style.container}>
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
          <div className={style.profileName}>
            {profile.firstName} {profile.lastName}
          </div>
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
