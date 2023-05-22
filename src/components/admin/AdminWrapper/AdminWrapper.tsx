import { useState } from 'react';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

import { iRestaurantWithFKData } from '@/src/types/iRestaurant';
import { useUser } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import AdminContextProvider from './AdminContextProvider';

export default function AdminWrapper({ children }: { children: JSX.Element }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const user = useUser();

  const [restaurant, setRestaurant] = useState<
    iRestaurantWithFKData | undefined
  >(undefined);

  return (
    <AdminContextProvider restaurant={restaurant} setRestaurant={setRestaurant}>
      <>
        <Head>
          <link rel="icon" href={restaurant?.picture_url} />
          {restaurant ? (
            <title>Admin - {restaurant.name}</title>
          ) : (
            <title>Admin</title>
          )}
        </Head>
        <div className={`fixed bg-white-200 ${!user ? 'hidden' : ''}`}>
          <Navbar toogleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <Sidebar isSidebarOpen={isSidebarOpen} />
          <div
            className={`absolute transition-[left] h-[calc(100vh-64px)] overflow-auto duration-500 bg-white-200 ease-in-out p-5 ${
              isSidebarOpen ? 'left-64 w-[calc(100vw-260px)]' : 'left-0 w-full'
            }`}
          >
            {children}
          </div>
        </div>
      </>
    </AdminContextProvider>
  );
}
