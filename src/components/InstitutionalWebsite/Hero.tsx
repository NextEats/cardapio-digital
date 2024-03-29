import Image from 'next/image';

import nextEatsOrangeLogo from '@/src/assets/logoNovoPng.png';
import heroImage from '@/src/assets/pc.png';
import * as fbq from '@/src/shared/lib/fpixel';
import Link from 'next/link';
import { useState } from 'react';
import { BiMenuAltRight } from 'react-icons/bi';
import Menu from './Menu';

const Hero = () => {
  const backgroundImageStyles = {
    // background: `rgb(246, 246, 246) url(${backgroundAboveTheFold.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundOrigin: 'content-box',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    zIndex: '-1',
  };
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const handleGetStarted = () => {
    fbq.personalizedPixelEvent('GetStarted', { current: 'BRL', value: 10 });
  };

  return (
    <>
      <div className="h-9 w-full bg-[#fc6e26] justify-end hidden lg:flex"></div>
      <div className="lg:hidden fixed z-50 top-0 right-0 w-full bg-white flex items-center">
        <div className=" w-full flex justify-between items-center">
          <Image
            src={nextEatsOrangeLogo}
            alt="nextEatsOrangeLogo"
            width={200}
            className="m-5 h-[70px] object-cover"
          />
          <button onClick={() => setIsOpenMenu(true)}>
            <BiMenuAltRight className="text-4xl mr-10" />
          </button>
        </div>
      </div>

      <Menu isOpen={isOpenMenu} setIsOpen={setIsOpenMenu} />
      <div className="w-screen" style={backgroundImageStyles}>
        <div id="start" className="max-w-[1246px] mx-auto px-8 pt-5">
          <div className="hidden lg:flex flex-row justify-between items-center">
            <Image
              src={nextEatsOrangeLogo}
              alt="nextEatsOrangeLogo"
              width={160}
              className=""
            />
            <div className="flex items-center gap-4">
              <ul className="text-gray-800 flex flex-row gap-4 child:cursor-pointer child-hover:opacity-80 child:transition child:delay-75 child:text-lg">
                <li>
                  <Link
                    href="#advantages"
                    className="w-full h-full font-medium text-base uppercas hover:text-orange-500 uppercase"
                  >
                    Vantagens
                  </Link>
                </li>
                <li>
                  <Link
                    href="#Planos"
                    className="w-full h-full font-medium text-base uppercase hover:text-orange-500"
                  >
                    Planos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#Clientes"
                    className="w-full h-full font-medium text-base uppercase hover:text-orange-500"
                  >
                    Clientes
                  </Link>
                </li>
                <li>
                  <Link
                    href="#Depoimentos"
                    className="w-full h-full font-medium text-base uppercase hover:text-orange-500"
                  >
                    Depoimentos
                  </Link>
                </li>
              </ul>
              {/* <div className=" flex flex-row gap-x-4"> */}
              <button className="2xl:block bg-white text-base h-9 md:min-w-[150px] font-medium rounded-sm shadow-sm flex items-center justify-center">
                <Link href={'login'} prefetch={false} target="_blank">
                  LOGIN
                </Link>
              </button>
              <button className="2xl:block bg-orange-500 h-9 text-white text-base min-w-[180px] rounded-sm shadow-sm font-medium flex items-center justify-center">
                <Link
                  href={'https://wa.me/5511985872255'}
                  prefetch={false}
                  target="_blank"
                >
                  QUERO ASSINAR
                </Link>
              </button>
            </div>
          </div>
          {/* </div> */}
          <div className="flex flex-col lg:flex-row pt-32 pb-10 lg:py-20">
            <div className="w-full flex flex-col">
              <div className="w-full xs:w-fit">
                <span className="text-brand-dark-orange leading-tight text-2xl 3xs:text-5xl block">
                  Automatize as <u> entregas </u> e <br />
                  <span className="">o</span>{' '}
                  <u className="font-normal ">gerenciamento</u>
                  <br className="" />
                  <span className="">do seu restaurante.</span>
                </span>

                <span className="w-full text-left text-base 3xs:text-xl md:text-2xl sm:text-normal text-[#838383] mb-5 block">
                  Livre das taxas dos marketplaces e 100% digital.
                </span>
                <div className="mt-4">
                  <button className="mr-2">
                    <Link
                      href={'https://wa.me/5511985872255'}
                      prefetch={false}
                      onClick={() => handleGetStarted()}
                      target="_blank"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="w-8 h-8 text-orange-500"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                      </svg>
                    </Link>
                  </button>
                  <button className="ml-2">
                    <Link
                      href={'https://www.instagram.com/nexteats.com.br/'}
                      prefetch={false}
                      target="_blank"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="w-8 h-8 text-orange-500"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                      </svg>
                    </Link>
                  </button>
                </div>
                <button className="h-12 px-5 bg-white text-xl font-semibold rounded shadow-md text-brand-light-orange my-6 hover:scale-110 transition-all duration-200">
                  <Link
                    href={'https://wa.me/5511985872255'}
                    prefetch={false}
                    target="_blank"
                  >
                    Começar gratuitamente
                  </Link>
                </button>
              </div>
            </div>
            <div className="w-full lg:mt-0 xl:flex z-20 relative mt-10 max-h-[700px]">
              <Image
                src={heroImage.src}
                width={1000}
                height={800}
                alt=""
                className=""
              />
            </div>
            {/* <div className="m-10 block lg:hidden">
              <Image
                src={heroImage.src}
                width={800}
                height={800}
                alt="heroImage"
                className=""
              />
            </div> */}
          </div>
        </div>
        {/* <div className="bg-[#db490e] h-24 absolute bottom-[270px] w-screen hidden 2xl:block z-10"></div> */}
      </div>
    </>
  );
};

export default Hero;
