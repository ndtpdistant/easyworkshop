import { Link } from 'react-router-dom';
import useCreatedAt from '../../hooks/useCreatedAt';

import Spinner from '../Spinner';

import Like from '../../assets/icons/Like';
import style from './Comment.module.scss';
import { useEffect, useState } from 'react';

const Comment = ({ profileId, content, likes, createdAt }) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const onProfileLoaded = (resProfile) => {
    setProfile({ ...resProfile });
    setLoading(false);
  };

  useEffect(() => {
    easyworkshopService.getProfile(profileId).then(onProfileLoaded);
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.info}>
        <div className={style.profileImg}>
          <Link to={`/profile/${profileId}`}>
            {loading ? (
              <Spinner />
            ) : (
              <img src={profile.img} alt="pfp" className={style.profileImg} />
            )}
          </Link>
        </div>
        <div className={style.column}>
          <div className={style.profileName}>
            <Link to={`/profile/${profileId}`}>
              {profile.firstName} {profile.lastName}
            </Link>
          </div>
          <div className={style.content}>{content}</div>
          <div className={style.nav}>
            <div className={style.createdAt}>{useCreatedAt(createdAt)}</div>
            <button className={style.reply}>Reply</button>
          </div>
        </div>
      </div>
      <div className={style.likeWrapper}>
        <Like />
        <div className={style.likeCounter}>{likes}</div>
      </div>
    </div>
  );
};

export default Comment;
