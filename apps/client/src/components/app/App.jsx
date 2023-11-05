import Navbar from '../Navbar';
import Card from '../Card';
import Footer from '../Footer';

function App() {
  return (
    <div style={{ backgroundColor: 'gray' }}>
      <Navbar />
      <Card
        cardName={'Octopus'}
        createdBy={'Matthew Shulman'}
        cardImg={
          'https://cdn.thingiverse.com/renders/bd/3c/8b/bd/34/79ce327ccf19c444d662164138038e4b_preview_card.jpg'
        }
        profileImg={
          'https://img.thingiverse.com/cdn-cgi/image/fit=cover,quality=90,width=60,height=60/https://cdn.thingiverse.com/assets/ab/6f/b9/a6/32/McGybeer_v4.1_bgbig.png'
        }
      />
      <Footer />
    </div>
  );
}

export default App;
