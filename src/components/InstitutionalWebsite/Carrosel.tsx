import React from 'react';

interface Slide {
  src: string;
}

interface SliderProps {
  slides: Slide[];
  slidesToShow: number;
}

const Slider: React.FC = () => {
  const slides = [
    { src: 'http://placehold.it/200x150' },
    { src: 'http://placehold.it/200x150' },
    { src: 'http://placehold.it/200x150' },
    { src: 'http://placehold.it/200x150' },
    { src: 'http://placehold.it/200x150' },
    { src: 'http://placehold.it/200x150' },
    { src: 'http://placehold.it/200x150' },
    { src: 'http://placehold.it/200x150' },
    { src: 'http://placehold.it/200x150' },
    { src: 'http://placehold.it/200x150' },
    { src: 'http://placehold.it/200x150' },
    { src: 'http://placehold.it/200x150' },
    { src: 'http://placehold.it/200x150' },
  ];

  return (
    <div className="pt-32">
      <div className="flex flex-row max-w-[1500px] max-w-screen mx-auto p-8 overflow-x-auto">
        {slides.map((slide, index) => (
          <div key={index} className=" mx-1">
            <img src={slide.src} className="min-w-[180px]" alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
