import { useState, useMemo } from "react";
import { AdminContext } from "@/src/contexts/adminContext";
import { iRestaurantWithFKData } from "@/src/types/types";
import { useRouter } from "next/router";

interface iAdminContextProvider {
  children: JSX.Element;
}

export default function AdminContextProvider({
  children,
}: iAdminContextProvider) {
  const [restaurant, setRestaurant] = useState<
    iRestaurantWithFKData | undefined
  >(undefined);

  const router = useRouter();
  const { slug } = router.query;

  useMemo(() => {
    async function fetchRestaurantData() {
      const res = await fetch("/api/restaurants/" + slug).then((r) => r.json());
      setRestaurant(res);
    }

    fetchRestaurantData();
  }, [slug]);

  return (
    <AdminContext.Provider value={{ restaurant: restaurant }}>
      {children}
    </AdminContext.Provider>
  );
}
