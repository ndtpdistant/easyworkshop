import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { StlViewer } from 'react-stl-viewer';
import EasyworkshopService from '../../services/EasyworkshopService';

import Button from '../../components/Button';
import Comment from '../../components/comment/Comment';

import ArrowLeft from '../../assets/icons/ArrowLeft';
import Like from '../../assets/icons/Like';
import pfp from '../../pfp.jpg';
import style from './ItemMobile.module.scss';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './swiperStyle.scss';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Share from '../../assets/icons/Share';

export async function loader({ params }) {
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

const ItemMobile = () => {
  const navigation = useNavigate();
  const [item, setItem] = useState({});
  const card = useLoaderData();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    setItem(card);
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.itemWrapper}>
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
                <img style={{borderRadius: '10px 10px 0 0'}} src="https://swiperjs.com/demos/images/nature-1.jpg" />
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
          <div className={style.itemFooter}>
            <div className={style.rowWrapper}>
              <div className={style.title}>
                {item.title ? item.title : '<name error>'}
              </div>
              <div className={style.rowNav}>
                <div className={style.like}>
                  <Like />
                </div>
                <Button
                  inlineStyle={{
                    width: '68px',
                    height: '31px',
                    padding: '9px',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    fontSize: '10px',
                  }}
                >
                  Download
                </Button>
              </div>
            </div>
            <Link
              to={`/profile/${item.profileId}`}
              className={style.createdby}
            >
              {item.profileName ? item.profileName : '<profileName error>'}
            </Link>
            <div className={style.description}>{item.description}</div>
          </div>
          <div className={style.comments}>
            <div className={style.commentsHeader}>
                <div className={style.counter}>
                  <Comment />
                </div>
                <Share />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemMobile;
