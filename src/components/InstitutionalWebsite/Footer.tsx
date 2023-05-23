import nextEatsOrangeLogo from '@/src/assets/nexteats_logo_orange.png';
import Image from 'next/image';
import { BsWhatsapp } from 'react-icons/bs';
import { MdDoubleArrow } from 'react-icons/md';
const Footer = () => {
  return (
    <div className="min-h-[400px] text-white font-semibold bg-black  w-screen text-center grid grid-cols-3 gap-3 px-10 md:px-32 pt-16 pb-10">
      <div className="col-span-3 md:col-span-3 lg:col-span-1 flex items-center flex-col">
        <Image
          src={nextEatsOrangeLogo}
          alt="nextEatsOrangeLogo"
          width={200}
          className=""
        />
        <p className="text-left text-sm md:text-lg w-auto md:w-96">
          A plataforma foi desenvolvida para você criar cardápio online completo
          e receber seus pedidos via WhatsApp.
        </p>
      </div>
      <div className="col-span-3 md:col-span-3 lg:col-span-1 my-5 md:my-0 flex justify-center">
        <button className="bg-[#ff5c1b] shadow-lg rounded-md shadow-black py-[15px] px-[15px] md:px-[20px] text-white text-lg md:text-xl flex items-center h-fit">
          <BsWhatsapp className="inline-block mr-4 text-3xl mx-2" /> Clique para
          o Whatsapp
        </button>
      </div>
      <div className="col-span-3 md:col-span-3 lg:col-span-1 my-5 md:my-0">
        <div className="flex justify-center flex-col items-center">
          <h2 className="text-4xl font-bold">NEXTEATS</h2>
          <div className="w-[250px] h-1 bg-[#ff5c1b] rounded-md my-4"></div>
        </div>
        <ul className="list-none mt-2 child:my-2 child:flex child:items-start child:justify-center">
          <li>
            <h2 className="text-xl font-bold mr-4">QUEM SOMOS</h2>{' '}
            <MdDoubleArrow className="text-4xl" />
          </li>
          <li>
            <h2 className="text-xl font-bold mr-4">PARCERIA</h2>{' '}
            <MdDoubleArrow className="text-4xl" />
          </li>
          <li>
            <h2 className="text-xl font-bold mr-4">CONTATO</h2>{' '}
            <MdDoubleArrow className="text-4xl" />
          </li>
          <li>
            <h2 className="text-xl font-bold mr-4">CADASTRE-SE</h2>{' '}
            <MdDoubleArrow className="text-4xl" />
          </li>
        </ul>
      </div>
      <div className="col-span-3 flex flex-col md:flex-row lg:flex-row justify-evenly mt-10 items-center my-5 md:my-0">
        <h4>Politica de Privacidade</h4>
        <h4>Termos de uso e condições</h4>
        <h4>© NextEats - 2023 - Todos os direitos Reservados</h4>
      </div>
    </div>
  );
};

export default Footer;
