import { BsArrowRight } from 'react-icons/bs';
import { MdMenuBook } from 'react-icons/md';

export default function ComoFunciona() {
  return (
    <>
      <div className="bg-black flex w-screen mt-11 flex min-h-[150px] flex-row">
        <div className="flex ml-[5%] lg:ml-[30%] items-center">
          <MdMenuBook className="text-[#ff5c1b] text-[50px] md:text-[100px]" />
          <div className="ml-5 flex flex-col">
            <h3 className="text-white text-xl md:text-3xl md:mt-6">
              VEJA COMO
            </h3>
            <h3 className="text-[#ff5c1b] text-3xl md:text-6xl">FUNCIONA</h3>
          </div>
        </div>
        <div className="w-full flex justify-center md:justify-end items-center">
          <BsArrowRight className="text-white text-[50px] md:text-[100px] mr-[15%] md:mr-[30%]" />
        </div>
      </div>
      <div className="bg-[#ff5c1b] flex w-screen flex justify-center min-h-[20px]"></div>
    </>
  );
}
