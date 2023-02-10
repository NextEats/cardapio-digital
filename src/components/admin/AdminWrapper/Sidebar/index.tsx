import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { RestaurantContext } from "@/src/contexts/restaurantContext";
import { FaChartBar, FaCog, FaHome, FaUtensils } from "react-icons/fa";

export default function Sidebar({
  isSidebarOpen,
  restaurantSlug,
}: {
  isSidebarOpen: boolean;
  restaurantSlug: string;
}) {
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
          path={`/${restaurantSlug}/admin`}
        />
        <ListItem
          name="Cardápio Digital"
          icon={<FaUtensils className="mr-4 h-8 w-8" />}
          path={`/${restaurantSlug}/admin/cardapio-digital`}
        />
        <ListItem
          name="Relatório"
          icon={<FaChartBar className="mr-4 h-8 w-8" />}
          path={`/${restaurantSlug}/admin/relatorios`}
        />
        <ListItem
          name="Configurações"
          icon={<FaCog className="mr-4 h-8 w-8" />}
          path={`/${restaurantSlug}/admin/configuracoes`}
        />
      </ul>
    </div>
  );
}

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
