import * as _supabase_supabase_js from '@supabase/supabase-js';
import { createContext } from 'react';
import {
    iRestaurantWithFKData,
    tUserDetailsWithFKData,
} from './../types/types';

export interface iAdminContext {
    restaurant: iRestaurantWithFKData | undefined;
    userDetails: tUserDetailsWithFKData | undefined;
    user: _supabase_supabase_js.AuthUser | null;
}

export const AdminContext = createContext({} as iAdminContext);
