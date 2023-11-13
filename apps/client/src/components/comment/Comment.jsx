import { Link } from 'react-router-dom';

import Like from '../../assets/icons/Like';
import style from './Comment.module.scss';

const Comment = ({
  profileId,
  profileImg,
  commentText,
  likes,
  createdAt,
  profileName,
}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.info}>
        <div className={style.profileImg}>
          <Link to={`profile/${profileId}`}>
            <img src={profileImg} alt="pfp" className={style.profileImg} />
          </Link>
        </div>
        <div className={style.column}>
          <div className={style.profileName}>
            <Link to={`profile/${profileId}`}>{profileName}</Link>
          </div>
          <div className={style.commentText}>{commentText}</div>
          <div className={style.nav}>
            <div className={style.createdAt}>{createdAt}</div>
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
