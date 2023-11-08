import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Card from '../../components/Card';

import style from './Home.module.scss';

const Home = () => {
  return (
    <>
      <Navbar />
      <main className={style.wrapper}>
        <div className={style.container}>
          <Card />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
