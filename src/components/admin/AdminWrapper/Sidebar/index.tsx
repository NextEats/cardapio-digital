import { AdminContext } from '@/src/contexts/adminContext';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { FaChartBar, FaCog, FaMotorcycle, FaUtensils } from 'react-icons/fa';
import { IoMdExit } from 'react-icons/io';
import SidebarListItem from '../../SidebarListItem';
interface iSidebar {
    isSidebarOpen: boolean;
}

import Bandeja from '@/src/assets/bandeja.svg';
import Image from 'next/image';

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
                                icon={<FaMotorcycle className="mr-4 h-7 w-7" />}
                                path={`/${restaurantName}/admin`}
                            />
                            <SidebarListItem
                                name="Delivery"
                                icon={<FaMotorcycle className="mr-4 h-7 w-7" />}
                                path={`/${restaurantName}/admin`}
                            />
                            <SidebarListItem
                                name="Produtos"
                                icon={<FaUtensils className="mr-4 h-7 w-7" />}
                                path={`/${restaurantName}/admin/cardapio-digital`}
                            />
                            <SidebarListItem
                                name="Relatórios"
                                icon={<FaChartBar className="mr-4 h-7 w-7" />}
                                path={`/${restaurantName}/admin/relatorios`}
                            />
                            <SidebarListItem
                                name="Configurações"
                                icon={<FaCog className="mr-4 h-7 w-7" />}
                                path={`/${restaurantName}/admin/configuracoes`}
                            />
                        </>
                    )}
                    {/* {userDetails?.restaurants.has_access_to_table_control ? (
                        <SidebarListItem
                            name="Controle de Mesas"
                            icon={<Bandeja className="mr-4 h-8 w-8" />}
                            path={`/${restaurantName}/admin/table-control`}
                        />
                    ) : null} */}
                    <Image src={Bandeja} alt="" className="icon-test" />
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
