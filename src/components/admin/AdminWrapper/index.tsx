import { useState, useMemo, useContext, useEffect } from "react";
import { FaBars, FaHome, FaUtensils, FaChartBar, FaCog } from "react-icons/fa";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import useWindowSize, { Size } from "../../../hooks/WindowResize";
import { RestaurantContext, iRestaurantContext } from "../../../contexts/restaurantContext";
import { supabase } from "../../../server/api";

import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

async function getRestaurantData(slug: string) {
  const restaurants = await supabase
    .from("restaurants")
    .select(
      `
      id,
      created_at,
      name,
      restaurant_type_id,
      picture_url,
      banner_url,
      slug,
      addresses (
        id,
        created_at,
        cep,
        number,
        reference_point,
        complement,
        google_maps_link
      ),
      weekday_operating_time (
        restaurant_id,
        is_active,
        opening_time,
        closing_time,
        weekday_id,
        weekdays (id, name)
      )
    `
    )
    .eq("slug", slug);

  if (!restaurants.data) {
    return;
  }

  return restaurants.data[0] as unknown as iRestaurantContext["restaurant"];
}

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


  const [restaurant, setRestaurant] = useState<any>()

  const router = useRouter()

  useEffect(() => {
    const { slug } = router.query

    if (typeof slug === "string") {
      getRestaurantData(slug).then((res) => {
        console.log(res)

        if (!res) {
          return <></>
        }

        setRestaurant(res)
      })
    }
  }, [])

  if (!restaurant) {
    return <>Loading</>
  }

  return (
    <div className="fixed bg-white-200">
      <Navbar toogleSidebar={() => changeSidebarState(!isSidebarOpenState)} />
      <Sidebar isSidebarOpen={isSidebarOpenState} restaurantSlug={restaurant.slug} />
      <div
        className={`absolute transition-[left] h-[calc(100vh-64px)] overflow-auto duration-500 ease-in-out p-5 ${isSidebarOpenState ? "left-64 w-[calc(100vw-260px)]" : "left-0 w-full"
          }`}
      >
        {children}
      </div>
    </div>
  );
}

