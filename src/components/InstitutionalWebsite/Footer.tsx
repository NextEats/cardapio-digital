import nextEatsOrangeLogo from '@/src/assets/logoNovoPng.png';
import Image from 'next/image';
import Link from 'next/link';
import { BsWhatsapp } from 'react-icons/bs';
import { MdDoubleArrow } from 'react-icons/md';
const Footer = () => {
  return (
    <div className=" flex justify-center bg-black">
      <div className="max-w-[1246px] min-h-[400px] text-white font-semibold bg-black  w-screen text-center grid grid-cols-3 gap-3 px-10 md:px-32 pt-16 pb-10">
        <div className="col-span-3 md:col-span-3 lg:col-span-1 flex items-start sx:items-center flex-col">
          <Image
            src={nextEatsOrangeLogo}
            alt="nextEatsOrangeLogo"
            width={200}
            className=""
          />
          <p className="text-left text-sm md:text-lg w-auto">
            A plataforma foi desenvolvida para você criar cardápio online
            completo e receber seus pedidos via WhatsApp.
          </p>
        </div>
        <div className="col-span-3 md:col-span-3 lg:col-span-1 my-10 md:my-10 flex justify-center">
          <Link
            href={'https://wa.me/5511985872255'}
            prefetch={false}
            target="_blank"
            className="bg-[#ff5c1b] shadow-lg rounded-md shadow-black py-[15px] px-[15px] md:px-[20px] text-white text-lg md:text-xl flex items-center h-fit"
          >
            <BsWhatsapp className="inline-block mr-4 text-3xl mx-2" /> Clique
            para o Whatsapp
          </Link>
        </div>
        <div className="col-span-3 md:col-span-3 lg:col-span-1 my-5 md:my-0">
          <div className="flex justify-center flex-col items-center">
            <h2 className="text-4xl font-bold">NEXTEATS</h2>
            <div className="w-[250px] h-1 bg-[#ff5c1b] rounded-md my-4"></div>
          </div>
          <ul className="list-none mt-2 child:my-2 child:flex child:items-start child:justify-center">
            <li>
              <Link className="flex items-center gap-2" href="#advantages">
                <h2 className="text-xl font-bold mr-4">VANTAGENS</h2>{' '}
                <MdDoubleArrow className="text-4xl" />
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-2" href="#Planos">
                <h2 className="text-xl font-bold mr-4">PLANOS</h2>{' '}
                <MdDoubleArrow className="text-4xl" />
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-2" href="#Clientes">
                <h2 className="text-xl font-bold mr-4">CLIENTES</h2>{' '}
                <MdDoubleArrow className="text-4xl" />
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-2" href="#Depoimentos">
                <h2 className="text-xl font-bold mr-4">DEPOIMENTOS</h2>{' '}
                <MdDoubleArrow className="text-4xl" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-3 flex flex-col md:flex-row lg:flex-row justify-evenly mt-10 items-center my-5 md:my-0">
          <h4>Politica de Privacidade</h4>
          <h4>Termos de uso e condições</h4>
          <h4>© NextEats - 2023 - Todos os direitos Reservados</h4>
        </div>
      </div>
    </div>
  );
};

export default Footer;
