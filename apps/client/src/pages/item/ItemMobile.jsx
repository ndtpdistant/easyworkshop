import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { StlViewer } from 'react-stl-viewer';

import Button from '../../components/Button';
import Comment from '../../components/Comment';

import Like from '../../assets/icons/Like';
import style from './ItemMobile.module.scss';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './swiperStyle.scss';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Share from '../../assets/icons/Share';

const url = '../src/pages/item/Pumpkin_Spinner_v0.stl';
const stlViewerStyle = {
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  color: '#007aff',
};

const ItemMobile = ({ item, itemUser, data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleDownload = () => {
    console.log(1)
    const stlData = data.find((item) => item.type === 'application/vnd.ms-pki.stl');

    if (stlData) {
      const { base64, type } = stlData;
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'yourFileName.stl'; // Set the desired file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

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
              {data.map((item, index) => (
                <SwiperSlide>
                  {item.type == 'application/vnd.ms-pki.stl' ? (
                    <StlViewer
                      style={stlViewerStyle}
                      orbitControls={true}
                      rotationX={true}
                      rotationY={true}
                      shadows
                      url={`data:${item.type};base64,${item.base64}`}
                    />
                  ) : (
                    <img
                      key={index}
                      style={{ borderRadius: '10px 10px 0 0' }}
                      src={
                        item.base64
                          ? `data:${item.type};base64,${item.base64}`
                          : null
                      }
                    />
                  )}
                </SwiperSlide>
              ))}
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
              {data.map((item, index) => (
                <SwiperSlide>
                  {item.type == 'application/vnd.ms-pki.stl' ? (
                    <StlViewer
                      style={stlViewerStyle}
                      orbitControls={true}
                      rotationX={true}
                      rotationY={true}
                      shadows
                      url={`data:${item.type};base64,${item.base64}`}
                    />
                  ) : (
                    <img
                      key={index}
                      // style={{ borderRadius: '10px 10px 0 0' }}
                      src={
                        item.base64
                          ? `data:${item.type};base64,${item.base64}`
                          : null
                      }
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={style.itemFooter}>
            <div className={style.rowWrapper}>
              <div className={style.title}>
                {item.item_name ? item.item_name : '<name error>'}
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
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </div>
            </div>
            <Link to={`/profile/${item.profileId}`} className={style.createdby}>
              {itemUser.first_name && itemUser.last_name
                ? `${itemUser.first_name} ${itemUser.last_name}`
                : '<profileName error>'}
            </Link>
            <div className={style.description}>{item.about}</div>
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
    </div>
  );
};

export default ItemMobile;
