import * as _supabase_supabase_js from '@supabase/supabase-js';
import { createContext } from 'react';
import { iRestaurantWithFKData } from '../types/iRestaurant';
import { tUserDetailsWithFKData } from '../types/iUser';
import { User } from 'node_modules/@supabase/gotrue-js/src/lib/types'

export interface iAdminContext {
  restaurant: iRestaurantWithFKData | undefined;
  userDetails: tUserDetailsWithFKData | undefined;
  user: _supabase_supabase_js.AuthUser | User | null;
}

export const AdminContext = createContext({} as iAdminContext);
