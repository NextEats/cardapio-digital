import * as _supabase_supabase_js from '@supabase/supabase-js';
import { createContext } from 'react';
import { iRestaurantWithFKData } from '../types/iRestaurant';
import { tUserDetailsWithFKData } from '../types/iUser';

export interface iAdminContext {
  restaurant: iRestaurantWithFKData | undefined;
  userDetails: tUserDetailsWithFKData | undefined;
  user: _supabase_supabase_js.AuthUser | null;
}

export const AdminContext = createContext({} as iAdminContext);
