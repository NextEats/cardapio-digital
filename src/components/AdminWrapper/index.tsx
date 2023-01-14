import { useState, useMemo } from "react";
import { FaBars, FaHome, FaUtensils, FaChartBar, FaCog } from "react-icons/fa";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import useWindowSize, { Size } from "../../hooks/WindowResize";

export default function AdminWrapper({ children }: { children: JSX.Element }) {
  const [isSidebarOpenState, changeSidebarState] = useState<true | false>(true);
  const windowSize: Size = useWindowSize();

  useMemo(() => {
    if (windowSize.width) {
      if (windowSize.width < 1024) {
        changeSidebarState(false);
      } else {
        changeSidebarState(true);
      }
    }
  }, [windowSize]);

  return (
    <div className="fixed bg-white-200">
      <Navbar toogleSidebar={() => changeSidebarState(!isSidebarOpenState)} />
      <Sidebar isSidebarOpen={isSidebarOpenState} />
      <div
        className={`absolute transition-[left] h-screen overflow-auto duration-500 ease-in-out p-5 ${
          isSidebarOpenState ? "left-64" : "left-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  function ListItem({
    name,
    icon,
    path,
  }: {
    name: string;
    icon: JSX.Element;
    path: string;
  }) {
    const router = useRouter();

    var linkClasses =
      "flex flex-row h-14 items-center text-gray-500 hover:bg-gray-700 hover:text-gray-100 px-3 cursor-pointer";

    if (router.asPath === path) {
      linkClasses =
        "flex flex-row h-14 items-center bg-gray-700 text-gray-100 px-3";
    }

    return (
      <Link href={path} className={linkClasses}>
        <li className="flex flex-row items-center">
          {icon} {name}
        </li>
      </Link>
    );
  }

  return (
    <div
      className={`select-none bg-gray-800 w-60 h-screen absolute transition-[left] duration-500 ease-in-out ${
        isSidebarOpen ? "left-0" : "-left-64"
      }`}
    >
      <ul className="flex flex-col mt-5">
        <ListItem
          name="Página Inicial"
          icon={<FaHome className="mr-4 h-8 w-8" />}
          path="/admin"
        />
        <ListItem
          name="Cardápio Digital"
          icon={<FaUtensils className="mr-4 h-8 w-8" />}
          path="/admin/cardapio-digital"
        />
        <ListItem
          name="Relatório"
          icon={<FaChartBar className="mr-4 h-8 w-8" />}
          path="/admin/relatorios"
        />
        <ListItem
          name="Configurações"
          icon={<FaCog className="mr-4 h-8 w-8" />}
          path="/admin/configuracoes"
        />
      </ul>
    </div>
  );
}

function Navbar({ toogleSidebar }: { toogleSidebar: Function }) {
  return (
    <div className="select-none bg-gray-800 w-screen h-16 flex items-center px-5">
      <div className="mr-5" onClick={() => toogleSidebar()}>
        <FaBars className="w-7 h-7 text-white cursor-pointer" />
      </div>
      <Image
        src="https://i.ibb.co/nP2JBbC/Next-Eats-1000-500-px-1.png"
        alt=""
        height={50}
        width={170}
      />
    </div>
  );
}
