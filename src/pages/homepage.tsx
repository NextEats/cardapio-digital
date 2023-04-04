import { useEffect } from 'react';

import Advantages from '../components/homepage/Advantages';
import Features from '../components/homepage/Features';
import Footer from '../components/homepage/Footer';
import Hero from '../components/homepage/Hero';
import Testimonials from '../components/homepage/Testimonials';

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
            {/* <Contact /> */}
            <Footer />
        </>
    );
};

export default Homepage;
