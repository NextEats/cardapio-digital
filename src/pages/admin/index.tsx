import { useState, useEffect } from "react";
import { FaBars, FaHome, FaUtensils, FaChartBar, FaCog } from "react-icons/fa";

import Image from "next/image";
import useWindowSize, { Size } from "./../../hooks/WindowResize";

export default function AdminHomepage() {
  const [isSidebarOpen, changeSidebarState] = useState<true | false>(true);

  const windowSize: Size = useWindowSize();

  //   const mediaQuery = window.matchMedia("(max-width: 700px)");

  useEffect(() => {
    if (windowSize.width) {
      if (windowSize.width < 1024) {
        changeSidebarState(false);
      } else {
        changeSidebarState(true);
      }
    }
  }, [windowSize]);

  const navbarItemsClasses =
    "flex flex-row h-14 items-center text-gray-500 hover:bg-gray-700 hover:text-gray-100 px-5 cursor-pointer";
  const iconsListClasses = "mr-4 h-8 w-8";

  return (
    <div className="fixed select-none">
      <div className="bg-gray-800 w-screen h-16 flex items-center px-5">
        <div
          className="mr-5"
          onClick={() => changeSidebarState(!isSidebarOpen)}
        >
          <FaBars className="w-7 h-7 text-white cursor-pointer" />
        </div>
        <Image
          src="https://i.ibb.co/nP2JBbC/Next-Eats-1000-500-px-1.png"
          alt=""
          height={50}
          width={170}
        />
      </div>
      <div
        className={`bg-gray-800 w-80 h-screen absolute transition-[left] duration-500 ease-in-out ${
          isSidebarOpen ? "left-0" : "-left-80"
        }`}
      >
        <ul className="flex flex-col mt-5">
          <li className={navbarItemsClasses}>
            <FaHome className={iconsListClasses} /> Página Inicial
          </li>
          <li className={navbarItemsClasses}>
            <FaUtensils className={iconsListClasses} /> Cardápio Digital
          </li>
          <li className={navbarItemsClasses}>
            <FaChartBar className={iconsListClasses} /> Relatório
          </li>
          <li className={navbarItemsClasses}>
            <FaCog className={iconsListClasses} /> Configurações
          </li>
        </ul>
      </div>
    </div>
  );
}
