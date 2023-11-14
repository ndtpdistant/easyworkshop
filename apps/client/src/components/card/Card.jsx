import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../Button';

import style from './Card.module.scss';
import Like from '../../assets/icons/Like';

const Card = ({
  title,
  img,
  id,
  profileId,
  profileName,
  profileImg,
  description,
}) => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (window.screen.width < 480) {
      setMobile(true);
    }
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.imgContainer}>
          <Link to={`/item/${id}`}>
            <img src={img} className={style.img} />
          </Link>
        </div>
        <div className={style.cardFooter}>
          {mobile ? (
            <>
              <div className={style.rowWrapper}>
                <div className={style.cardName}>
                  {title ? title : '<name error>'}
                </div>
                <div className={style.like}>
                  <Like />
                </div>
              </div>
              <Link
                to={`/profile/${profileId}`}
                className={style.cardCreatedby}
              >
                {profileName ? profileName : '<profileName error>'}
              </Link>
              <div className={style.description}>{description}</div>
            </>
          ) : (
            <>
              <div className={style.cardInfo}>
                <div className={style.profileImg}>
                  <Link to={`profile/${profileId}`}>
                    <img
                      src={profileImg}
                      className={style.profileImg}
                      alt="pfp"
                    />
                  </Link>
                </div>
                <div className={style.cardDescr}>
                  <div className={style.cardName}>
                    {title ? title : '<name error>'}
                  </div>
                  <Link
                    to={`/profile/${profileId}`}
                    className={style.cardCreatedby}
                  >
                    {profileName ? profileName : '<profileName error>'}
                  </Link>
                </div>
              </div>
              <Link to={`/item/${id}`}>
                <Button>Download</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
