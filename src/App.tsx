import { useEffect, useState } from 'react';

import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import DaySections from './components/sections/DaySection';
import FullMap from './components/sections/FullMap';
import TravelTips from './components/sections/TravelTips';
import Footer from './components/sections/Footer';
import BackToTop from './components/BackToTop';

import './App.css';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar scrollY={scrollY} />
      <main>
        <Hero />
        <DaySections />
        <FullMap />
        <TravelTips />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
