import { Link } from 'react-router-dom';
import useCreatedAt from '../../hooks/useCreatedAt';

import Like from '../../assets/icons/Like';
import style from './Comment.module.scss';
import EasyworkshopService from '../../services/EasyworkshopService';
import { useEffect, useState } from 'react';

const Comment = ({ profileId, content, likes, createdAt }) => {
  const easyworkshopService = new EasyworkshopService();
  const [profile, setProfile] = useState({});
  const [date, setDate] = useState(useCreatedAt(createdAt));

  useEffect(() => {
    setProfile(easyworkshopService.getProfile(profileId));
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.info}>
        <div className={style.profileImg}>
          <Link to={`profile/${profileId}`}>
            <img src={profile.profileImg} alt="pfp" className={style.profileImg} />
          </Link>
        </div>
        <div className={style.column}>
          <div className={style.profileName}>
            <Link to={`profile/${profileId}`}>{profile.profileName}</Link>
          </div>
          <div className={style.commentText}>{content}</div>
          <div className={style.nav}>
            <div className={style.createdAt}>{useCreatedAt(createdAt)}</div>
            <button>Reply</button>
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
