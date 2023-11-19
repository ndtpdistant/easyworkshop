import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../Button';

import style from './Card.module.scss';
import Like from '../../assets/icons/Like';
import { getItem, serveFile } from '../../services/apiItem';

const Card = ({ id }) => {
  const navigation = useNavigate();
  const [mobile, setMobile] = useState(false);
  const [item, setItem] = useState({});
  const [itemUser, setItemUser] = useState({});
  const [data, setData] = useState({});
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const loadData = async (id) => {
    setItem((await getItem(`item/?id=${id}`)).data);
    setItemUser((await getItem(`itemuser/?id=${id}`)).data);
    setData(await serveFile(firstFilePath));
    // setData(
    //   await Promise.all(
    //     item.filepath.map(async (filepath) => {
    //       return await serveFile(filepath);
    //     }),
    //   ),
    // );

    // console.log(await serveFile(item.filepath[0]));
  };

  useEffect(() => {
    if (window.screen.width < 480) {
      setMobile(true);
    }
    loadData(id);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setData(await serveFile(item.filepath[0]));
    };
    fetchData();
  }, [item]);

  // useEffect(() => {
  // }, [item])

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.imgContainer}>
          <Link to={`/item/${id}`}>
            <img src={`data:${data.type};base64,${data.base64}`} width="100%" height="100%" className={style.img} />
          </Link>
        </div>
        <div className={style.cardFooter}>
          {mobile ? (
            <>
              <div className={style.rowWrapper}>
                <div className={style.cardName}>
                  {item.item_name ? item.item_name : '<name error>'}
                </div>
                <div className={style.like}>
                  <Like />
                </div>
              </div>
              <Link
                to={`/profile/${itemUser.id}`}
                className={style.cardCreatedby}
              >
                {itemUser.first_name ? itemUser.first_name : '<profileName error>'}
              </Link>
              <div className={style.description}>{item.about}</div>
            </>
          ) : (
            <>
              <div className={style.cardInfo}>
                <div className={style.profileImg}>
                  <Link to={`profile/${itemUser.id}`}>
                    <img
                      // src={profileImg}
                      className={style.profileImg}
                      alt="pfp"
                    />
                  </Link>
                </div>
                <div className={style.cardDescr}>
                  <div className={style.cardName}>
                    {item.item_name ? item.item_name : '<name error>'}
                  </div>
                  <Link
                    to={`/profile/${itemUser.id}`}
                    className={style.cardCreatedby}
                  >
                    {itemUser.first_name ? itemUser.first_nameeName : '<profileName error>'}
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
