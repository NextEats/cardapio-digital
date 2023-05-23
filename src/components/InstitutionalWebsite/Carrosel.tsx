import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import React from 'react';

import 'keen-slider/keen-slider.min.css';
import Link from 'next/link';
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
      url: 'https://www.nexteats.com.br/gago-burguer',
    },
    {
      src: 'https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/Design%20sem%20nome.jpg',
      url: 'https://www.nexteats.com.br/majuca',
    },
    {
      src: 'https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/LOGO%20RICARDO%20ESPETARIA%20(2).png',
      url: 'https://www.nexteats.com.br/a-melhor-espetaria',
    },
    {
      src: 'https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/gago.png',
      url: 'https://www.nexteats.com.br/gago-burguer',
    },
    {
      src: 'https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/Design%20sem%20nome.jpg',
      url: 'https://www.nexteats.com.br/majuca',
    },
    {
      src: 'https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/LOGO%20RICARDO%20ESPETARIA%20(2).png',
      url: 'https://www.nexteats.com.br/a-melhor-espetaria',
    },
    {
      src: 'https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/gago.png',
      url: 'https://www.nexteats.com.br/gago-burguer',
    },

    //sadasd
    {
      src: 'https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/Design%20sem%20nome.jpg',
      url: 'https://www.nexteats.com.br/majuca',
    },
    {
      src: 'https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/LOGO%20RICARDO%20ESPETARIA%20(2).png',
      url: 'https://www.nexteats.com.br/a-melhor-espetaria',
    },
    {
      src: 'https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/gago.png',
      url: 'https://www.nexteats.com.br/gago-burguer',
    },
    {
      src: 'https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/Design%20sem%20nome.jpg',
      url: 'https://www.nexteats.com.br/majuca',
    },
    {
      src: 'https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/LOGO%20RICARDO%20ESPETARIA%20(2).png',
      url: 'https://www.nexteats.com.br/a-melhor-espetaria',
    },
    {
      src: 'https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/restaurant-pictures/gago.png',
      url: 'https://www.nexteats.com.br/gago-burguer',
    },
  ];

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 2.4,
      spacing: 5,
    },
    breakpoints: {
      '(min-width: 400px)': {
        slides: {
          perView: 3.2,
          spacing: 0,
        },
      },
      '(min-width: 500px)': {
        slides: {
          perView: 4.2,
          spacing: 8,
        },
      },
      '(min-width: 1000px)': {
        slides: {
          perView: 8,
          spacing: 8,
        },
      },
      '(min-width: 1400px)': {
        slides: {
          perView: 9.5,
          spacing: 8,
        },
      },
    },
  });

  return (
    <div className="max-w-[1500px] 2xl:mx-auto px-8 pt-32">
      <h2 className="text-4xl md:text-6xl font-bold">Clientes</h2>
      <div className="w-32 h-2 bg-[#ff5c1b] rounded-md my-4"></div>
      <p className="text-black font-semibold  text-[15px] md:text-[20px] md:px-8">
        Descubra o Sucesso de diversos clientes satisfeitos que confiam na
        NextEats para agilizar e otimizar seus pedidos diariamente.
      </p>
      <div
        ref={sliderRef}
        className="flex flex-row max-w-full mx-auto keen-slider overflow-x-auto"
      >
        {slides.map((slide, index) => (
          <Link key={index} target="_blank" href={slide.url} prefetch={false}>
            <div className="keen-slider__slide  p-2">
              <Image
                src={slide.src}
                alt=""
                className="rounded-md  min-w-40 shadow-sm object-cover"
                width={800}
                height={800}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Slider;
