import { createContext } from "react"
import { iRestaurantWithFKData } from "./../types/types"

export interface iRestaurantContext {
    restaurant: [iRestaurantWithFKData | undefined, React.Dispatch<React.SetStateAction<iRestaurantWithFKData>> | undefined]
}

export const RestaurantContext = createContext({} as iRestaurantContext);