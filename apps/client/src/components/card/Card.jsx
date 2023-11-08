import { Link } from 'react-router-dom';

import Button from '../Button';

import style from './Card.module.scss';

const Card = ({
  title,
  img,
  id,
  profileId,
  profileName,
  profileImg,
}) => {
  // const Card = ({ title, img, profileName, profileImg, link }) => {
  // to-do
  // добавить линки

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <Link to={`/model/${id}`}>
          <div className={style.imgContainer}>
            <img src={img} className={style.img} />
          </div>
        </Link>
        <div className={style.cardFooter}>
          <div className={style.cardInfo}>
            <div className={style.profileImg}>
              <Link to={`profile/${profileId}`}>
                <img
                  src={profileImg}
                  // src={profileImg}
                  className={style.profileImg}
                  alt="pfp"
                />
              </Link>
            </div>
          </div>
          <div className={style.cardDescr}>
            <div className={style.cardName}>
              {title ? title : '<name error>'}
            </div>
            <Link to={`/profile/${profileId}`} className={style.cardCreatedby}>
              {profileName ? profileName : '<profileName error>'}
            </Link>
          </div>
          <Button text={'Download'} />
        </div>
        
      </div>
    </div>
  );
};

export default Card;
