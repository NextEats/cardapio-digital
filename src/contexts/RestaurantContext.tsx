import { GetServerSideProps } from "next";
import { createContext, ReactNode, useMemo, useState } from "react";
import { supabase } from "../server/api";
import { IRestaurant } from "../types/home";
import { Dispatch, SetStateAction } from "react";

export const RestaurantContext = createContext({} as IRestaurantContext);

interface IRestaurantContext {
  // restaurant: IRestaurant | null;
}

interface RestaurantContextProviderProps {
  children: ReactNode;
}

interface IRestaurantDataReq {
  data: IRestaurant[];
}

async function getRestaurants() {
  const { data } = await supabase.from("restaurants").select().eq("id", 3, );

  if (!data) {
    return;
  }

  return data;
}

export default function RestaurantContextProvider({
  children,
}: RestaurantContextProviderProps) {
  const [restaurant, setRestaurant] = useState<IRestaurant>();

  useMemo(() => {
    getRestaurants().then((res) => {
      if (!res) {
        return;
      }
      setRestaurant(res[0]);
    });
  }, []);

  return (
    <RestaurantContext.Provider
      value={{
        // restaurant,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}
