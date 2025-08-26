import React from 'react';
import HeroSection from '../components/HeroSection';
import OffersSection from '../components/OffersSection';
import MenuSection from '../components/MenuSection';
import AboutSection from '../components/AboutSection';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <OffersSection />
      <MenuSection />
      <AboutSection />
    </div>
  );
};

export default Home;