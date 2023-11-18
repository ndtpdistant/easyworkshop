import { useEffect, useState } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import EasyworkshopService from '../../services/EasyworkshopService';

import Card from '../../components/Card';
import Spinner from '../../components/Spinner';

import style from './Home.module.scss';

export async function loader() {
  const easyworkshopService = new EasyworkshopService();
  const cards = await easyworkshopService.getAllCards();
  return cards;
}

const Home = () => {
  const [cardList, setCardList] = useState([]);
  const [offset, setOffset] = useState(0);
  const cards = useLoaderData();
  const navigation = useNavigation();

  useEffect(() => {
    setCardList(cards);
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {navigation.state === 'loading' ? (
          <Spinner />
        ) : cardList ? (
          cardList.map((card) => (
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
        ) : null}
      </div>
    </div>
  );
};

export default Home;
