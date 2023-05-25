import { useEffect } from 'react';

import { useRouter } from 'next/router';
import Script from 'next/script';
import Advantages from '../components/InstitutionalWebsite/Advantages';
import { Slider } from '../components/InstitutionalWebsite/Carrosel';
import Contact from '../components/InstitutionalWebsite/Contact';
import { Features } from '../components/InstitutionalWebsite/Features';
import Footer from '../components/InstitutionalWebsite/Footer';
import Hero from '../components/InstitutionalWebsite/Hero';
import Testimonials from '../components/InstitutionalWebsite/Testimonials';
import ComoFunciona from '../components/InstitutionalWebsite/howWorks';
import * as fbq from '../shared/lib/fpixel.js';

export default function Homepage() {
  useEffect(() => {
    const body = document.getElementById('body');
    body?.classList.add('overflow-x-hidden');
  }, []);

  const router = useRouter();

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    fbq.pageview();

    const handleRouteChange = () => {
      fbq.pageview();
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Hero />
      <Advantages />
      <Features />
      <ComoFunciona />
      <Slider />
      <Testimonials />
      <Contact />
      <Footer />
      {/* Global Site Code Pixel - Facebook Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${process.env.FB_PIXEL_ID});
          `,
        }}
      />
    </>
  );
}
