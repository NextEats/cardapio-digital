import Image from 'next/image';
import { FaBars } from 'react-icons/fa';

export default function Navbar({ toogleSidebar }: { toogleSidebar: Function }) {
    return (
        <div className="select-none bg-[#101214] w-screen h-16 flex items-center px-5 shadow-xl">
            <div className="mr-5" onClick={() => toogleSidebar()}>
                <FaBars className="w-7 h-7 text-white cursor-pointer" />
            </div>
            <Image
                src="https://i.ibb.co/nP2JBbC/Next-Eats-1000-500-px-1.png"
                alt=""
                className="mx-auto"
                height={50}
                width={170}
            />
        </div>
    );
}
