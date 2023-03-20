import { AdminContext } from '@/src/contexts/adminContext';
import { useUserAndDetails } from '@/src/hooks/User';
import useWindowSize, { Size } from '@/src/hooks/WindowResize';
import restaurants from '@/src/pages/api/restaurants/all';
import { supabase } from '@/src/server/api';
import { SetStateAction, useContext, useMemo, useState } from 'react';
import { FaChartBar, FaCog, FaHome, FaUtensils } from 'react-icons/fa';
import { GiTable } from 'react-icons/gi';
import { IoMdExit } from 'react-icons/io';
import SidebarListItem from '../../SidebarListItem';
import { useRouter } from 'next/router'

interface iSidebar {
  isSidebarOpen: boolean;
  setIsSidebarOpenState: React.Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpenState,
}: iSidebar) {
  // const { restaurant } = useContext(AdminContext);

  const router = useRouter()
  const slug = router.query.slug


  // const windowSize: Size = useWindowSize();

  // const { user, userDetails } = useUserAndDetails();
  // const [slug, setSlug] = useState("")

  // useMemo(async () => {
  //   const restaurant = await supabase.from('restaurants').select("*").eq("slug", restaurantSlug)
  //   if (restaurant.data === null) return
  //   setSlug(restaurant.data[0].slug)
  // }, [restaurantSlug])
  // console.log(slug)
  // useMemo(() => {
  //   const {data } = 
  // },[])
  // useMemo(() => {
  //   if (windowSize.width) {
  //     if (windowSize.width < 1024) {
  //       setIsSidebarOpenState(false);
  //     } else {
  //       setIsSidebarOpenState(true);
  //     }
  //   }
  // }, [windowSize, setIsSidebarOpenState]);

  return (
    <div
      className={`select-none bg-gray-800 w-60 h-screen absolute transition-[left] duration-500 ease-in-out ${isSidebarOpen ? 'left-0' : '-left-64'
        }`}
    >
      <ul className="flex flex-col mt-5">
        {/* {userDetails?.is_waiter === false && ( */}
        <>
          <SidebarListItem
            name="Página Inicial"
            icon={<FaHome className="mr-4 h-8 w-8" />}
            path={`/${slug}/admin`}
          />
          <SidebarListItem
            name="Produtos2"
            icon={<FaUtensils className="mr-4 h-8 w-8" />}
            path={`/${slug}/admin/cardapio-digital`}
          />
          <SidebarListItem
            name="Produtos"
            icon={<FaUtensils className="mr-4 h-8 w-8" />}
            path={`/${slug}/admin/products`}
          />
          <SidebarListItem
            name="Relatórios"
            icon={<FaChartBar className="mr-4 h-8 w-8" />}
            path={`/${slug}/admin/relatorios`}
          />
          <SidebarListItem
            name="Configurações"
            icon={<FaCog className="mr-4 h-8 w-8" />}
            path={`/${slug}/admin/configuracoes`}
          />
        </>
        {/* )} */}
        <SidebarListItem
          name="Controle de Mesas"
          icon={<GiTable className="mr-4 h-8 w-8" />}
          path={`/${slug}/admin/table-control`}
        />
        <SidebarListItem
          name="Sair"
          icon={<IoMdExit className="mr-4 h-8 w-8" />}
          path={`/logout`}
        />
      </ul>
    </div>
  );
}
