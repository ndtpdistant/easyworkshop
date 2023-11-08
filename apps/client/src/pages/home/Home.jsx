import Card from '../../components/Card';

import style from './Home.module.scss';
import pfp from './pfp.jpg';

import { useEffect, useState } from 'react';

const Home = () => {
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    setCardList([
      {
        title: '3DBenchy',
        img: pfp,
        id: 1,
        profileId: 1,
        profileName: 'Markus',
        profileImg: pfp,
      },
    ]);
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
