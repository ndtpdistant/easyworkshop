import { useEffect, useState } from 'react';
import {
  useLoaderData,
  useNavigation,
  useOutletContext,
} from 'react-router-dom';

import Card from '../../components/Card';
import Spinner from '../../components/Spinner';

import style from './Home.module.scss';
import { getHome } from '../../services/apiItem';

export async function loader() {
  const response = await getHome();
  return response;
}

const Home = () => {
  const [name, setName] = useOutletContext().name;
  const [loading, setLoading] = useOutletContext().loading;
  const [itemList, setItemList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(0);
  const recievedData = useLoaderData();
  const navigation = useNavigation();

  useEffect(() => {
    setItemList(recievedData);
  }, [recievedData]);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {navigation.state === 'loading' ? (
          <Spinner />
        ) : itemList ? (
          itemList.map((item) => (
            <Card
              key={item}
              id={item}
            />
          ))
        ) : null}
      </div>
    </div>
  );
};

export default Home;
