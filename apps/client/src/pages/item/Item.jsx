import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EasyworkshopService from '../../services/EasyworkshopService';

import Button from '../../components/Button';

import arrowLeft from '../../assets/icons/arrow-left.svg';
import like from '../../assets/icons/like.svg';
import pfp from '../../pfp.jpg';
import style from './Item.module.scss';

export async function loader({ params }) {
  const easyworkshopService = new EasyworkshopService();
  const item = await easyworkshopService.getCard(params.itemId);
  return item;
}

const Item = () => {
  const navigation = useNavigate();
  const [item, setItem] = useState({});
  const card = useLoaderData();

  useEffect(() => {
    setItem(card);
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.itemWrapper}>
          <div className={style.itemHeader}>
            <button
              className={style.transparent}
              onClick={() => navigation(-1)}
            >
              <img src={arrowLeft} alt="arrow left" />
            </button>
            <div className={style.itemInfo}>
              <Link to={`profile/${item.profileId}`}>
                <img className={style.profileImg} src={pfp} alt="pfp" />
              </Link>
              <div className={style.namesWrapper}>
                <div className={style.itemName}></div>
                <div className={style.profileName}></div>
              </div>
              <div className={style.created}></div>
              <div className={style.likeWrapper}>
                <div className={style.likeCounter}></div>
                <button className={style.transparent}>
                  <img src={arrowLeft} alt="arrow left" />
                </button>
              </div>
            </div>
            <Button>Download all files</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
