import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Card from '../../components/Card';

import style from './Profile.module.scss';
import Pencil from '../../assets/icons/Pencil';

import {
  getBackgroundPicture,
  getProfile,
  getProfilePicture,
  changeProfilePicture,
} from '../../services/apiProfile';
import { getItem } from '../../services/apiItem';

import { jwtDecode } from 'jwt-decode';

export async function loader({ params }) {
  const profile = await getProfile(params.profileId);
  const profilePicture = await getProfilePicture(params.profileId);
  const backgroundPicture = await getBackgroundPicture(params.profileId);
  const id = params.profileId;
  return { profile, profilePicture, backgroundPicture, id };
}

const Profile = () => {
  const [mobile, setMobile] = useState(false);
  const [profile, setProfile] = useState({});
  const [isYours, setYours] = useState(false);
  const receivedProfile = useLoaderData();
  const [profilePicture, setProfilePicture] = useState(null);
  const [backgroundPicture, setBackgroundPicture] = useState(null);
  const [profileImageType, setProfileImageType] = useState(null);
  const [backgroundImageType, setBackgroundImageType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // setProfile(receivedProfile);
    if (window.screen.width < 480) {
      setMobile(true);
    }
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
    setProfilePicture(receivedProfile.profilePicture?.base64);
    setProfileImageType(receivedProfile.profilePicture?.type);
    setBackgroundPicture(receivedProfile.backgroundPicture?.base64);
    setBackgroundImageType(receivedProfile.backgroundPicture?.type);
    if (localStorage.getItem('token')) {
      if (
        +receivedProfile.id == +jwtDecode(localStorage.getItem('token')).sub
      ) {
        setYours(true);
      }
    }

    // console.log(isYours)
  }, [receivedProfile]);

  useEffect(() => {
    console.log(isYours);
  }, [isYours]);

  // img sample
  // {profilePicture && imageType && (
  //   <img
  //     src={`data:${imageType};base64,${profilePicture}`}
  //     alt="Profile"
  //     style={{ width: '150px', height: '150px' }}
  //   />
  // )}

  return (
    <>
    <div className={style.wrapper}>
      {!mobile ? null : (
        <div className={style.userContainer}>
          <img
            src={
              backgroundPicture && backgroundImageType
                ? `data:${backgroundImageType};base64,${backgroundPicture}`
                : null
            }
            alt="profile backgroung"
            className={style.profileBackground}
          />
          <img
            src={
              profilePicture && profileImageType
                ? `data:${profileImageType};base64,${profilePicture}`
                : null
            }
            alt="profile backgroung"
            className={style.profileImg}
          />
          <div className={style.nameWrapper}>
            <div></div>
            <div className={style.profileName}>
              {profile.first_name} {profile.last_name}
            </div>
            {isYours ? (
              <button onClick={() => navigate('edit')}>
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
                {profile.first_name} {profile.last_name}
              </div>
              {isYours ? (
                <button onClick={() => navigate('/edit')}>
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
    </>
  );
};

export default Profile;
