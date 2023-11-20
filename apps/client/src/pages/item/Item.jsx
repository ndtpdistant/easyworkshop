import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { StlViewer } from 'react-stl-viewer';

import Button from '../../components/Button';
import Comment from '../../components/Comment';
import ItemMobile from './ItemMobile';

import ArrowLeft from '../../assets/icons/ArrowLeft';
import Share from '../../assets/icons/Share';
import Like from '../../assets/icons/Like';
import style from './Item.module.scss';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './swiperStyle.scss';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { getItem, serveFile } from '../../services/apiItem';

export async function loader({ params }) {
  const item = (await getItem(`item/?id=${params.itemId}`)).data;
  const itemUser = (await getItem(`itemuser/?id=${params.itemId}`)).data;
  const data = await Promise.all(item.filepath.map(async (filepath) => {
    return await serveFile(filepath);
  }));
  return { item, itemUser, data };
}

const url = '../src/pages/item/Pumpkin_Spinner_v0.stl';
const stlViewerStyle = {
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
};

const Item = () => {
  const navigation = useNavigate();
  const [item, setItem] = useState({});
  const [itemUser, setItemUser] = useState({});
  const [data, setData] = useState({});
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mobile, setMobile] = useState(false);
  const recievedItem = useLoaderData();

  useEffect(() => {
    if (window.screen.width < 480) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    setItem(recievedItem.item);
    setItemUser(recievedItem.itemUser);
    setData(recievedItem.data);
  }, [recievedItem])

  useEffect(() => {
    console.log(data);
  }, [data])
  
  return (
    <>
      {mobile ? (
        <ItemMobile item={item} itemUser={itemUser} data={data}/>
      ) : (
        <div className={style.wrapper}>
          <div className={style.container}>
            <div className={style.itemWrapper}>
              <div className={style.itemHeader}>
                <div className={style.leftSide}>
                  <button
                    className={`${style.transparent} ${style.back}`}
                    onClick={() => navigation(-1)}
                  >
                    <ArrowLeft />
                  </button>
                  <div className={style.itemInfo}>
                    <div className={style.profileImg}>
                      <Link to={`/profile/${item.profileId}`}>
                        <img
                          className={style.profileImg}
                          src={item.profileImg}
                          alt="pfp"
                        />
                      </Link>
                    </div>
                    <div className={style.namesWrapper}>
                      <div className={style.itemName}>{item.item_name}</div>
                      <Link to={`/profile/${item.profileId}`}>
                        <div className={style.profileName}>
                          {item.profile_name}
                        </div>
                      </Link>
                    </div>
                    <div className={style.created}>October, 10 2023</div>
                    <div className={style.likeWrapper}>
                      <div className={style.likeCounter}>1k</div>
                      <button className={style.transparent}>
                        <Like />
                      </button>
                    </div>
                  </div>
                </div>
                <div className={style.download}>
                  <Button
                    inlineStyle={{
                      width: '200px',
                      height: '60px',
                      fontWeight: 'bold',
                    }}
                  >
                    Download all files
                  </Button>
                </div>
              </div>
              <div className={style.imagesContainer}>
                <Swiper
                  style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                  }}
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  allowTouchMove={false}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <StlViewer
                      style={stlViewerStyle}
                      orbitControls={true}
                      rotationX={true}
                      rotationY={true}
                      shadows
                      url={url}
                    />
                  </SwiperSlide>
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <StlViewer style={stlViewerStyle} url={url} />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            <div className={style.description}>
              <div className={style.title}>Details</div>
              <div className={style.text}>{item.description}</div>
            </div>
            <div className={style.commentsSection}>
              <div className={style.commentsHeader}>
                <div className={style.counter}>
                  {item.comments ? item.comments.length : 0} comments
                </div>
                <Share />
              </div>
              {item.comments ? (
                <div className={style.comments}>
                  {item.comments.map((comment) =>
                    comment.parent_comment_id === null ? (
                      <Comment
                        key={comment.id}
                        profileId={comment.user_id}
                        content={comment.content}
                        createdAt={comment.CreatedAt}
                        likes={1000}
                      />
                    ) : null,
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Item;
