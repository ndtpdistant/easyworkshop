import Button from '../Button';
import style from './Card.module.scss';
import pfp from './pfp.jpg';

const Card = ({
  title = '3DBenchy',
  img = pfp,
  profileName = 'Markus',
  profileImg = pfp,
  link,
}) => {
  // const Card = ({ title, img, profileName, profileImg, link }) => {
  // to-do
  // добавить линки

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <a href={link}>
          <div className={style.imgContainer}>
            <img src={pfp} className={style.img} />
          </div>
        </a>
        <div className={style.cardFooter}>
          <div className={style.cardInfo}>
            <div className={style.profileImg}>
              <a href="https://google.com">
                <img
                  src={pfp}
                  // src={profileImg}
                  className={style.profileImg}
                  alt="pfp"
                />
              </a>
            </div>
            <div className={style.cardDescr}>
              <div className={style.cardName}>
                {title ? title : '<name error>'}
              </div>
              <a href="#" className={style.cardCreatedby}>
                {profileName ? profileName : '<profileName error>'}
              </a>
            </div>
          </div>
          <Button text={'Download'} />
        </div>
      </div>
    </div>
  );
};

export default Card;
