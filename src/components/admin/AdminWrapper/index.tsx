import { useState } from 'react';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

import { iRestaurantWithFKData } from '@/src/types/types';
import Head from 'next/head';
import AdminContextProvider from './AdminContextProvider';

export default function AdminWrapper({ children }: { children: JSX.Element }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const [restaurant, setRestaurant] = useState<
        iRestaurantWithFKData | undefined
    >(undefined);

    return (
        <AdminContextProvider
            restaurant={restaurant}
            setRestaurant={setRestaurant}
        >
            <>
                <Head>
                    <link rel="icon" href={restaurant?.picture_url} />
                    <title>Admin - {restaurant?.name}</title>
                </Head>
                <div className="fixed bg-white-200">
                    <Navbar
                        toogleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    />
                    <Sidebar isSidebarOpen={isSidebarOpen} />
                    <div
                        className={`absolute transition-[left] h-[calc(100vh-64px)] overflow-auto duration-500 ease-in-out p-5 ${
                            isSidebarOpen
                                ? 'left-64 w-[calc(100vw-260px)]'
                                : 'left-0 w-full'
                        }`}
                    >
                        {children}
                    </div>
                </div>
            </>
        </AdminContextProvider>
    );
}
