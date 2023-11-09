import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import EasyworkshopService from '../../services/EasyworkshopService';

import Button from '../../components/Button';

import ArrowLeft from '../../assets/icons/ArrowLeft';
import Like from '../../assets/icons/Like';
import pfp from '../../pfp.jpg';
import style from './Item.module.scss';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './swiperStyle.scss';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export async function loader({ params }) {
  const easyworkshopService = new EasyworkshopService();
  const item = await easyworkshopService.getCard(params.itemId);
  return item;
}

const Item = () => {
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
                  <Link to={`profile/${item.profileId}`}>
                    <img className={style.profileImg} src={pfp} alt="pfp" />
                  </Link>
                </div>
                <div className={style.namesWrapper}>
                  <div className={style.itemName}>Item’s name</div>
                  <Link to={`/profile/${item.profileId}`}>
                    <div className={style.profileName}>Author’s name</div>
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
                <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
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
                <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className={style.description}>
          <div className={style.title}>Details</div>
          <div className={style.text}>
            This publication is about a much improved spring for my popular cord
            lock design. If you don't have the original design, it can be found
            for free at printables.comhttps://www.printables.com/model/570028
            The original model features a cleverly shaped folded spring. But in
            the end I figured that a regular spring gives even better tension.
            The trick to get it printed without supports is to print at least 6
            springs at a time. That allows the material to cool down before the
            next layer is printed. And obviously you have even more springs once
            you are done printing. Of course you needed to use a flexible
            material, I strongly recommend PETG. PLA will not be flexible
            enough. The spring will deform statically a bit when you press it in
            for the first time, but it will retain enough travel and force for a
            long term usage. I could have designed the spring at a lower pitch
            right away, but the high pitch is key to making it printable without
            supports. (And this is the real clue on this design).
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
