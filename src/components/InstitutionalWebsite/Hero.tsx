import Image from 'next/image';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import heroImage from '@/src/assets/hero-image.png';
import nextEatsOrangeLogo from '@/src/assets/nexteats_logo_orange.png';

const Hero = () => {
  const backgroundImageStyles = {
    // background: `rgb(246, 246, 246) url(${backgroundAboveTheFold.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundOrigin: 'content-box',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    zIndex: '-1',
  };

  return (
    <div className="min-h-screen w-screen" style={backgroundImageStyles}>
      <div
        id="start"
        className="max-w-[1500px] max-w-screen mx-auto px-12 pt-12"
      >
        <div className="hidden lg:flex flex-row justify-between items-center">
          <Image
            src={nextEatsOrangeLogo}
            alt="nextEatsOrangeLogo"
            width={200}
            className="hidden xl:block"
          />
          <div>
            <ul className="text-gray-800 flex flex-row gap-x-7 child:cursor-pointer child-hover:opacity-80 child:transition child:delay-75 child:text-lg">
              <li>
                {/* <AnchorLink
                                    href="#start"
                                    className="w-full h-full"
                                >
                                    Início
                                </AnchorLink> */}
              </li>
              <li>
                <AnchorLink href="#advantages" className="w-full h-full">
                  Vantagens
                </AnchorLink>
              </li>
              <li>Planos</li>
              <li>Funcionalidades</li>
              <li>Depoimentos</li>
            </ul>
          </div>
          <div className="child:px-7 child:py-3 child-hover:opacity-60 child:transition child:rounded child:font-semibold flex flex-row gap-x-4">
            <button className="bg-white shadow border">JÁ SOU CLIENTE</button>
            <button className="bg-orange-500 text-white shadow-md ">
              QUERO ASSINAR
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-[80vh] items-center lg:justify-between">
          <div className="w-full max-w-[80vw] lg:max-w-[50%] flex items-center flex-col ">
            <div className="w-full">
              <span className="text-brand-dark-orange leading-tight text-5xl sm:text-[2.5rem] lg:text-[3.5rem] block">
                Automatize as&nbsp;
                <span className="font-semibold italic underline">entregas</span>
                &nbsp; e o&nbsp;
                <span className="font-semibold italic underline">
                  gerenciamento
                </span>
                <br />
                do seu restaurante.
              </span>

              <span className="w-full text-left text-2xl sm:text-normal text-[#838383] mt-8 block">
                Livre das taxas dos marketplaces e 100% digital.
              </span>
              <div>zap zap e instagrebs</div>

              <button className="bg-white shadow border text-[#FC6E25] min-h-[50px] min-w-[251px] text-[17px] font-bold my-6">
                Começar gratuitamente
              </button>
            </div>
          </div>
          <div className="w-full mt-16 md:mt-12 lg:mt-0 max-w-[100%] md:max-w-[70%] lg:max-w-[50%] flex items-center justify-center">
            <Image
              src={heroImage.src}
              width={800}
              height={800}
              alt="heroImage"
            />
          </div>
        </div>
      </div>
      <div className="bg-white h-14 absolute bottom-0 w-screen right-triangle"></div>
    </div>
  );
};

export default Hero;
