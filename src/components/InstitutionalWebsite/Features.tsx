import { subscriptionPlansData } from '@/src/shared/mocks/subscriptionPlansData';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { SubscriptionPlanCard } from './SubscriptionPlanCard';

export function Features() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div
      id="Planos"
      className="max-w-[1246px] mx-auto px-4 md:px-6 flex flex-col gap-8 justify-center py-16 relative pt-[120px]"
    >
      <div className="flex flex-col">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Conheça nossos Planos
        </h2>
        <div className="w-32 h-2 bg-brand-light-orange rounded-md my-4"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex gap-3 md:gap-6">
          <div className="h-60 w-3 rounded-sm bg-orange-700"></div>
          <div className="flex flex-col gap-3">
            <h1 className="text-brand-light-orange text-4xl md:text-6xl font-semibold underline">
              Preços
            </h1>
            <span className="text-gray-700 text-lg font-medium underline">
              Valos menos que uma bala por dia!
            </span>
            <p className="text-base mt-5 md:mt-10 max-w-[43rem] md:max-w-[32rem]">
              VAI ALÉM DE UM CARDÁPIO DIGITAL. VOCÊ OBTÉM MAIOR CONTROLE SOBRE O
              SEU NEGÓCIO COM A FERRAMENTA QUE FAZ A GESTÃO DE SEUS PEDIDOS,
              EMITE RELATÓRIOS DE VENDAS E FACILITA NA ORGANIZAÇÃO E AGILIDADE
              DO ATENDIMENTO, RESULTANDO EM MAIS VENDAS E MAIOR FATURAMENTO.
              TUDO ISSO SEM TAXAS ADICIONAIS.
            </p>
          </div>
        </div>
        <div
          ref={sliderRef}
          className="flex flex-1 w-full keen-slider sm:min-w-[26rem]"
        >
          {subscriptionPlansData.map((subscriptionPlan, index) => {
            return (
              <div
                key={index}
                className="sm:w-full flex justify-center py-2 keen-slider__slide"
              >
                <SubscriptionPlanCard
                  benefits={subscriptionPlan.benefits}
                  monthlyPrice={0}
                  name={subscriptionPlan.title}
                  description={subscriptionPlan.description}
                />
              </div>
            );
          })}
          {loaded && instanceRef.current && (
            <>
              <SlArrowLeft
                className={`absolute top-1/2 transform -translate-y-1/2 text-white cursor-pointer left-2 hidden 3xs:block
              } ${currentSlide === 0 ? ' opacity-25 cursor-default' : ''}`}
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                size={32}
                color="#074956"
              />
              <SlArrowRight
                className={`absolute top-1/2 transform -translate-y-1/2 text-white cursor-pointer right-2 hidden 3xs:block
              } ${
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
                  ? ' opacity-50 cursor-default'
                  : ''
              }`}
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                size={32}
                color="#074956"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-full md:max-w-min sm:w-full bg-white z-30 border-t-2 md:border-2 border-[#CED1D5] md:rounded-2xl md:min-w-[250px]">
  <div className="">
    <h1 className="text-gray-700 text-4xl font-black">Start</h1>
    <p className="text-gray-500  mt-2">Plano Base</p>
  </div>
  <div className="text-center mt-3">
    <ul className="space-y-3 min-h-[200px]">
      <li className="flex items-center space-x-2" key={1}>
        <span className="bg-orange-600 rounded-full p-1">
          <svg
            xmlns="httwww.w3.org/2000/svg"
            className="h-3 w-3 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
        <span className="text-gray-600 capitalize">vantagem 1</span>
      </li>
      <li className="flex items-center space-x-2" key={2}>
        <span className="bg-orange-600 rounded-full p-1">
          <svg
            xmlns="httwww.w3.org/2000/svg"
            className="h-3 w-3 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
        <span className="text-gray-600 capitalize">Email Support</span>
      </li>
    </ul>
  </div>
  <button className="flex items-center justify-center w-full h-12 px-6 text-sm font-bold uppercase bg-gray-200 rounded">
    Testar por 7 dias grátis
  </button>
</div>
<div className="py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-full md:max-w-min sm:w-full bg-orange-500 transform scale-1 sm:scale-1 md:scale-105 lg:lg:scale-105 xl:scale-105 z-40  shadow-none sm:shadow-none md:shadow-xl lg:shadow-xl xl:shadow-xl md:rounded-2xl md:min-w-[300px] lg:min-h-[400px]">

  <div className="">
    <h1 className="text-white text-4xl font-black">Expert</h1>
    <p className="text-white mt-2">Tudo do Plano Pro +</p>
  </div>
  <div className="text-center mt-3">
    <ul className="space-y-3 min-h-[200px]">
      <li className="flex items-center space-x-2" key={1}>
        <span className="bg-white rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-[#FC6E25]"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
        <span className="text-white capitalize">vantagem 1</span>
      </li>
      <li className="flex items-center space-x-2" key={2}>
        <span className="bg-white rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-[#FC6E25]"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
        <span className="text-white capitalize">Email Support</span>
      </li>
    </ul>
  </div>
  <button className="flex items-center justify-center w-full h-12 px-6 text-sm font-bold uppercase bg-gray-200 rounded">
    Testar por 7 dias grátis
  </button>
</div>
<div className="py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-full md:max-w-min sm:w-full bg-white z-30 border-b-2  md:border-2 border-[#CED1D5] md:rounded-2xl md:min-w-[250px]">
  <div className="7">
    <h1 className="text-gray-700 text-4xl font-black">Pro</h1>
    <p className="text-gray-500  mt-2">Tudo do Plano Start +</p>
  </div>
  <div className="text-center mt-3">
    <ul className="space-y-3 min-h-[200px]">
      <li className="flex items-center space-x-2" key={1}>
        <span className="bg-orange-600 rounded-full p-1">
          <svg
            xmlns="httwww.w3.org/2000/svg"
            className="h-3 w-3 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
        <span className="text-gray-600 capitalize">vantagem 1</span>
      </li>
      <li className="flex items-center space-x-2" key={2}>
        <span className="bg-orange-600 rounded-full p-1">
          <svg
            xmlns="httwww.w3.org/2000/svg"
            className="h-3 w-3 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
        <span className="text-gray-600 capitalize">Email Support</span>
      </li>
    </ul>
  </div>
  <button className="flex items-center justify-center w-full h-12 px-6 text-sm font-bold uppercase bg-gray-200 rounded">
    Testar por 7 dias grátis
  </button>
</div> */
}
