import Button from '../Button';
import * as style from './Card.module.scss';

const Card = ({ cardName, cardImg, createdBy, profileImg }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <a href="#" className={style.card_link}>
          <img src={cardImg} alt={cardName} className={style.card_img} />
        </a>
        <div className={style.nav_wrapper}>
          <div className={style.card_info}>
            <a href="#"lassName={style.profile_img}>
              <img
                src={profileImg}
                alt="profile"
                className={style.profile_img}
              />
            </a>
            <div className={style.card_descr}>
              <div className={style.card_name}>{cardName}</div>
              <a href='#' className={style.card_createdby}>{createdBy}</a>
            </div>
          </div>
          <Button
            text={'download'}
            borderRadius={10}
            width={117}
            height={43}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
