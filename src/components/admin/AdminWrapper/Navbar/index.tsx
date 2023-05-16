import Image from 'next/image';
import { FaBars } from 'react-icons/fa';

export default function Navbar({ toogleSidebar }: { toogleSidebar: Function }) {
  return (
    <div className="select-none bg-[#101214] w-screen h-16 flex items-center px-5 shadow-xl">
      <div className="mr-5" onClick={() => toogleSidebar()}>
        <FaBars className="w-7 h-7 text-white cursor-pointer" />
      </div>
      <div className="py-4 mx-auto">
        <Image
          src="https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/next-images/completa_branca.png"
          alt=""
          height={30}
          width={120}
          style={{ width: 'auto', height: 'auto' }}
          priority
        />
      </div>
    </div>
  );
}
