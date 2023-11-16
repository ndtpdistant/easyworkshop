import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { StlViewer } from 'react-stl-viewer';
import EasyworkshopService from '../../services/EasyworkshopService';

import Button from '../../components/Button';
import ItemMobile from './ItemMobile';

import ArrowLeft from '../../assets/icons/ArrowLeft';
import Like from '../../assets/icons/Like';
import style from './Item.module.scss';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './swiperStyle.scss';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export async function loader({ params }){
  const easyworkshopService = new EasyworkshopService();
  const item = await easyworkshopService.getCard(params.itemId);
  return item;
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
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mobile, setMobile] = useState(false);
  const card = useLoaderData();

  useEffect(() => {
    setItem(card);
    if (window.screen.width < 480) {
      setMobile(true);
    }
  }, []);

  return (
    <>
      {mobile ? (
        <ItemMobile item={item} />
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
                      <div className={style.itemName}>{item.title}</div>
                      <Link to={`/profile/${item.profileId}`}>
                        <div className={style.profileName}>
                          {item.profileName}
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
                <Button
                  inlineStyle={{
                    width: '200px',
                    height: '60px',
                    padding: '13px 17px',
                    borderRadius: '30px',
                    fontWeight: 'bold',
                  }}
                >
                  Download all files
                </Button>
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
          </div>
        </div>
      )}
    </>
  );
};

export default Item;
