import nextLogoBranca from '@/src/assets/logoBranca.png';
import Image from 'next/image';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
type menuProps = {
  isOpen: boolean;
  setIsOpen: Function;
};
export default function Menu({ isOpen, setIsOpen }: menuProps) {
  function closeMenu() {
    setIsOpen(!isOpen);
  }
  return (
    <div
      className={`${
        isOpen ? 'w-full translate-y-0 transform-[300ms]' : 'hidden w-0'
      } fixed h-full flex flex-col justify-center items-center  bg-orange-500 z-50 top-0 left-0 right-0`}
    >
      <div className="absolute top-0 right-0 left-0 pt-0 flex items-center justify-between">
        <Image
          src={nextLogoBranca}
          alt="nextEatsOrangeLogo"
          width={250}
          className="mt-5 h-[70px] object-cover"
        />
        <button onClick={() => closeMenu()}>
          {' '}
          <IoClose className="text-4xl mr-5 sm:mr-10 text-white" />
        </button>
      </div>
      <ul className="flex flex-col w-full gap-3 mt-3 font-semibold text-4xl items-center justify-center child:text-white">
        <li>
          <Link
            href="#advantages"
            className="w-full h-full font-medium text-xl uppercase"
            onClick={() => closeMenu()}
          >
            Vantagens
          </Link>
        </li>
        <li>
          <Link
            href="#Planos"
            className="w-full h-full font-medium text-xl uppercase"
            onClick={() => closeMenu()}
          >
            Planos
          </Link>
        </li>
        <li>
          <Link
            href="#Clientes"
            className="w-full h-full font-medium text-xl uppercase"
            onClick={() => closeMenu()}
          >
            Clientes
          </Link>
        </li>
        <li>
          <Link
            href="#Depoimentos"
            className="w-full h-full font-medium text-xl uppercase"
            onClick={() => closeMenu()}
          >
            Depoimentos
          </Link>
        </li>
        <li className="mt-5">
          <div className="flex flex-row gap-x-4">
            <button className="2xl:block bg-white text-black text-xl min-w-[150px] font-medium rounded-sm py-[6px] px-[15px] shadow-sm shadow-slate-400">
              LOGIN
            </button>
            <button className="2xl:block border-white border bg-orange-500 text-white text-xl xl:min-h-9 xl:min-w-[200px] rounded-sm py-[6px] px-[15px] shadow-sm shadow-slate-400 font-medium">
              QUERO ASSINAR
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}
