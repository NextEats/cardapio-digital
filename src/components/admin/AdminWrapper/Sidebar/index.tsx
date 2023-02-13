import { SetStateAction, useContext } from "react";
import { FaChartBar, FaCog, FaHome, FaUtensils } from "react-icons/fa";

import { AdminContext } from "@/src/contexts/adminContext";
import useWindowSize, { Size } from "@/src/hooks/WindowResize";
import { useMemo } from "react";
import SidebarListItem from "../../SidebarListItem";

interface iSidebar {
  isSidebarOpen: boolean;
  setIsSidebarOpenState: React.Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpenState,
}: iSidebar) {
  const { restaurant } = useContext(AdminContext);

  const windowSize: Size = useWindowSize();

  useMemo(() => {
    if (windowSize.width) {
      if (windowSize.width < 1024) {
        setIsSidebarOpenState(false);
      } else {
        setIsSidebarOpenState(true);
      }
    }
  }, [windowSize, setIsSidebarOpenState]);

  return (
    <div
      className={`select-none bg-gray-800 w-60 h-screen absolute transition-[left] duration-500 ease-in-out ${
        isSidebarOpen ? "left-0" : "-left-64"
      }`}
    >
      <ul className="flex flex-col mt-5">
        <SidebarListItem
          name="Página Inicial"
          icon={<FaHome className="mr-4 h-8 w-8" />}
          path={`/${restaurant?.slug}/admin`}
        />
        <SidebarListItem
          name="Cardápio Digital"
          icon={<FaUtensils className="mr-4 h-8 w-8" />}
          path={`/${restaurant?.slug}/admin/cardapio-digital`}
        />
        <SidebarListItem
          name="Relatório"
          icon={<FaChartBar className="mr-4 h-8 w-8" />}
          path={`/${restaurant?.slug}/admin/relatorios`}
        />
        <SidebarListItem
          name="Configurações"
          icon={<FaCog className="mr-4 h-8 w-8" />}
          path={`/${restaurant?.slug}/admin/configuracoes`}
        />
      </ul>
    </div>
  );
}
