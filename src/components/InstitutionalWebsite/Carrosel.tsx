import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import React from 'react';

import 'keen-slider/keen-slider.min.css';
// interface Slide {
//   src: string;
// }

// interface SliderProps {
//   slides: Slide[];
//   slidesToShow: number;
// }

const Slider: React.FC = () => {
  const slides = [
    {
      src: 'https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/gago.png',
    },
    {
      src: 'https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/Design%20sem%20nome.jpg',
    },
    {
      src: 'https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/LOGO%20RICARDO%20ESPETARIA%20(2).png',
    },
    {
      src: 'https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/gago.png',
    },
    {
      src: 'https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/Design%20sem%20nome.jpg',
    },
    {
      src: 'https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/LOGO%20RICARDO%20ESPETARIA%20(2).png',
    },
    {
      src: 'https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/gago.png',
    },
  ];

  const [sliderRef, instanceRef] = useKeenSlider({
    // slideChanged() {
    //   console.log('slide changed');
    // },

    slides: {
      perView: 2.4,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 400px)': {
        slides: {
          perView: 4,
          spacing: 16,
        },
      },
      '(min-width: 500px)': {
        slides: {
          perView: 5,
          spacing: 16,
        },
      },
      '(min-width: 1000px)': {
        slides: {
          perView: 8,
          spacing: 16,
        },
      },
      '(min-width: 1400px)': {
        slides: {
          perView: 11,
          spacing: 16,
        },
      },
    },
  });

  return (
    <div className="pt-32">
      <div
        ref={sliderRef}
        className="flex flex-row max-w-full mx-auto keen-slider overflow-x-auto"
      >
        {slides.map((slide, index) => (
          <div key={index} className="keen-slider__slide">
            <Image
              src={slide.src}
              alt=""
              className="rounded-md  min-w-40 object-cover"
              width={800}
              height={800}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
