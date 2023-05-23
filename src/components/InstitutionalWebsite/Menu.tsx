import AnchorLink from 'react-anchor-link-smooth-scroll';
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
      <button onClick={() => closeMenu()}>
        {' '}
        <IoClose className="text-4xl absolute top-0 right-0 mt-7 mr-5 sm:mr-10" />
      </button>
      <ul className="flex flex-col w-full gap-3 mt-3 font-semibold text-4xl items-center justify-center">
        <li>
          <AnchorLink
            href="#advantages"
            className="hover:text-orange-500"
            onClick={() => closeMenu()}
          >
            Vantagens
          </AnchorLink>
        </li>
        <li>
          <AnchorLink
            href="#Planos"
            className=" hover:text-orange-500"
            onClick={() => closeMenu()}
          >
            Planos
          </AnchorLink>
        </li>
        <li>
          <AnchorLink
            href="#Funcionalidades"
            className=" hover:text-orange-500"
            onClick={() => closeMenu()}
          >
            Funcionalidades
          </AnchorLink>
        </li>
        <li>
          <AnchorLink
            href="#Depoimentos"
            className=" hover:text-orange-500"
            onClick={() => closeMenu()}
          >
            Depoimentos
          </AnchorLink>
        </li>
      </ul>
    </div>
  );
}
