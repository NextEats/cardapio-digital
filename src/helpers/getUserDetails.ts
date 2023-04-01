import { supabase } from '@/src/server/api';

export const getUserDetails = async (userId: string) => {
    const { data: userDetailsData } = await supabase
        .from('user_details')
        .select(
            `
        id,
        restaurant_id,
        user_id,
        restaurants (
            id,
            name,
            slug
        )
      `
        )
        .eq('user_id', userId);

    if (userDetailsData) {
        return userDetailsData[0];
    }
    return null;
};
