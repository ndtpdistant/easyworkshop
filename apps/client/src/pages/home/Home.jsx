import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import EasyworkshopService from '../../services/EasyworkshopService';

import Card from '../../components/Card';

import style from './Home.module.scss';

export async function loader() {
  const easyworkshopService = new EasyworkshopService();
  const cards = await easyworkshopService.getAllCards();
  return cards;
}

const Home = () => {
  const [cardList, setCardList] = useState([]);
  const cards = useLoaderData();


  useEffect(() => {
    setCardList(cards);
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {cardList
          ? cardList.map((card) => (
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
  );
};

export default Home;
