import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import AdminContextProvider from "./AdminContextProvider";

export default function AdminWrapper({ children }: { children: JSX.Element }) {
  const [isSidebarOpenState, setIsSidebarOpenState] = useState(true);

  return (
    <AdminContextProvider>
      <div className="fixed bg-white-200">
        <Navbar
          toogleSidebar={() => setIsSidebarOpenState(!isSidebarOpenState)}
        />
        <Sidebar isSidebarOpen={isSidebarOpenState} setIsSidebarOpenState={setIsSidebarOpenState} />
        <div
          className={`absolute transition-[left] h-[calc(100vh-64px)] overflow-auto duration-500 ease-in-out p-5 ${
            isSidebarOpenState
              ? "left-64 w-[calc(100vw-260px)]"
              : "left-0 w-full"
          }`}
        >
          {children}
        </div>
      </div>
    </AdminContextProvider>
  );
}
