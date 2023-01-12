import { GetServerSideProps } from "next";
import { createContext, ReactNode, useState } from "react"
import { supabase } from "../../server/api";
import { IRestaurant } from "../../types/home";

interface IRestaurantContext {
    // restaurant: IRestaurant[]
  }

  interface RestaurantContextProviderProps {
    children: ReactNode
  }
  

export default function RestaurantContextProvider({ children }: RestaurantContextProviderProps) {


    const RestaurantContext = createContext({} as IRestaurantContext )
    const [ restaurant, setRestaurant ] = useState<IRestaurant[]>([])
    async function getRestaurants() {
         console.log(await supabase.from("restaurants").select())
    }
    getRestaurants()
    
    return <RestaurantContext.Provider value={{
        
    }}>
        {children}
    </RestaurantContext.Provider>
}

  