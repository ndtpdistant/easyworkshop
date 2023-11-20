import { useEffect, useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';

import Card from '../../components/Card';

import style from './Favorite.module.scss';

export async function loader({ params }) {
  if (!params.profileId) {
    return 0;
  }
  const favorites = await easyworkshop.getProfile(1);
  return favorites;
}

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  let favoritesReceived = useLoaderData();

  useEffect(() => {
    favoritesReceived = [
      favoritesReceived === 0 ? 0 : favoritesReceived.favorites,
    ];
    setFavorites([...favoritesReceived][0]);
  }, [favoritesReceived]);
  
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {favorites ? (
          <>
            <div className={style.title}>Your favorite models:</div>
            {favorites.map((card) => {
              return (
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
              );
            })}
          </>
        ) : favorites === 0 ? (
          <div className={style.error}>
            To view your favorites, first <Link to={'/auth'}>log into</Link>{' '}
            your account
          </div>
        ) : (
          <div className={style.error}>
            Oops! Seems like you haven’t liked anything yet! Visit{' '}
            <Link to={'/'}>home</Link> to search for something new!
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;
