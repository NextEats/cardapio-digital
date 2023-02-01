import { createContext } from "react"
import { iRestaurantsWithAddresses } from "./../types/types"

interface iRestaurantContext {
    restaurant: [iRestaurantsWithAddresses | undefined, React.Dispatch<React.SetStateAction<iRestaurantsWithAddresses>> | undefined]
}

export const RestaurantContext = createContext({} as iRestaurantContext);