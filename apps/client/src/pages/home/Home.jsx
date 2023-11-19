import { useEffect, useState } from 'react';
import { useLoaderData, useNavigation, useOutletContext } from 'react-router-dom';
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
  const [name] = useOutletContext().name;
  const [loading, setLoading] = useOutletContext().loading;
  const [cardList, setCardList] = useState([]);
  const cards = useLoaderData();
  const navigation = useNavigation();

  const easyworkshopService = new EasyworkshopService();

  useEffect(() => {
    async function fetchCards() {
      setLoading(true);
      try {
        const searchCards = await easyworkshopService.getCardsByName(name);
        setCardList(() => {
          setLoading(false);
          return searchCards;
        });
      } catch (error) {
        setLoading(false);
        console.error('Error fetching cards:', error);
      }
    }

    if (name.length > 0) {
      fetchCards();
    } else {
      setCardList(cards);
    }
  }, [name, cards]);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {navigation.state === 'loading' && <Spinner />}
        {cardList.map((card) => (
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
        ))}
      </div>
    </div>
  );
};

export default Home;