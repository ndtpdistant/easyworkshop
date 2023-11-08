import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Card from '../../components/Card';

import style from './Home.module.scss';

const Home = () => {
  return (
    <div className={style.homePage}>
      <Navbar />
      <div className={style.wrapper}>
        <div className={style.container}>
          <Card />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
