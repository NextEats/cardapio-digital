import { AdminContext } from '@/src/contexts/adminContext';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AiOutlineAreaChart } from 'react-icons/ai';
import { FaCog, FaMotorcycle } from 'react-icons/fa';
import { IoMdExit, IoMdRestaurant } from 'react-icons/io';
import { MdFastfood } from 'react-icons/md';
import { RiMoneyDollarBoxFill } from 'react-icons/ri';
import SidebarListItem from '../../SidebarListItem';
interface iSidebar {
  isSidebarOpen: boolean;
}

export default function Sidebar({ isSidebarOpen }: iSidebar) {
  const router = useRouter();
  const restaurantName = router.query.slug;

  const { userDetails } = useContext(AdminContext);

  return (
    <>
      <div
        className={`select-none bg-[#1A1F23] w-60 h-screen absolute transition-[left] duration-500 ease-in-out ${
          isSidebarOpen ? 'left-0' : '-left-64'
        } flex flex-col shadow-2xl`}
      >
        <ul className="flex flex-col mt-5">
          {userDetails?.is_waiter === false && (
            <>
              <SidebarListItem
                name="Controle de Caixa"
                icon={<RiMoneyDollarBoxFill className="mr-4 h-7 w-7" />}
                path={`/${restaurantName}/admin/caixa`}
              />
              <SidebarListItem
                name="Delivery"
                icon={<FaMotorcycle className="mr-4 h-7 w-7" />}
                path={`/${restaurantName}/admin/delivery`}
              />
              <SidebarListItem
                name="Produtos"
                icon={<MdFastfood className="mr-4 h-7 w-7" />}
                path={`/${restaurantName}/admin/products`}
              />
              <SidebarListItem
                name="Relatórios"
                icon={<AiOutlineAreaChart className="mr-4 h-7 w-7" />}
                path={`/${restaurantName}/admin/relatorios`}
              />
              <SidebarListItem
                name="Configurações"
                icon={<FaCog className="mr-4 h-7 w-7" />}
                path={`/${restaurantName}/admin/configuracoes`}
              />
            </>
          )}
          {userDetails?.restaurants.has_access_to_table_control ? (
            <SidebarListItem
              name="Controle de Mesas"
              icon={<IoMdRestaurant className="mr-4 h-8 w-8" />}
              path={`/${restaurantName}/admin/table-control`}
            />
          ) : null}
        </ul>
        <ul className="mt-auto mb-20 flex flex-col">
          <SidebarListItem
            name="Sair"
            icon={<IoMdExit className="mr-4 h-8 w-8" />}
            path={`/logout`}
          />
        </ul>
      </div>
    </>
  );
}
