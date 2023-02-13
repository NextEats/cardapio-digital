import { createContext } from "react";
import { iRestaurantWithFKData } from "./../types/types";

export interface iAdminContext {
  restaurant: iRestaurantWithFKData | undefined;
}

export const AdminContext = createContext({} as iAdminContext);
