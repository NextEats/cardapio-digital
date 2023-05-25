import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import { MdMenuBook } from 'react-icons/md';

export default function ComoFunciona() {
  return (
    <>
      <Link
        href={'https://www.nexteats.com.br/teste'}
        prefetch={false}
        target="_blank"
      >
        <div className="flex justify-center bg-black mt-11">
          <div className="max-w-[1246px] bg-black w-screen  flex min-h-[150px] flex-row">
            <div className="flex items-center ml-10">
              <MdMenuBook className="text-[#ff5c1b] text-[50px] md:text-[100px]" />
              <div className="ml-5 flex flex-col">
                <h3 className="text-white text-xl md:text-3xl md:mt-6">
                  VEJA COMO
                </h3>
                <h3 className="text-[#ff5c1b] text-3xl md:text-6xl">
                  FUNCIONA
                </h3>
              </div>
            </div>
            <div className="w-full flex justify-center md:justify-end items-center">
              <BsArrowRight className="text-white text-[50px] md:text-[100px]" />
            </div>
          </div>
        </div>
      </Link>
      <div className="bg-[#ff5c1b] w-screen flex justify-center min-h-[20px]"></div>
    </>
  );
}
