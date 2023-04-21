import { useEffect } from 'react';

import Advantages from '../components/InstitutionalWebsite/Advantages';
import Contact from '../components/InstitutionalWebsite/Contact';
import Features from '../components/InstitutionalWebsite/Features';
import Footer from '../components/InstitutionalWebsite/Footer';
import Hero from '../components/InstitutionalWebsite/Hero';
import Testimonials from '../components/InstitutionalWebsite/Testimonials';

const Homepage = () => {
  useEffect(() => {
    const body = document.getElementById('body');
    body?.classList.add('overflow-x-hidden');
  }, []);

  return (
    <>
      <Hero />
      <Advantages />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

export default Homepage;
