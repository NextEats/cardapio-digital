import { supabase } from '../../server/api';
import { iRestaurantWithFKData } from '../../types/types';

export async function getRestaurantBySlugFetch(
  slug: string | string[] | undefined
) {
  const { data, error } = await supabase
    .from('restaurants')
    .select(
      `
      *,
      restaurant_types (
        id,
        name
      ),
      addresses (
        id,
        created_at,
        cep,
        number,
        reference_point,
        complement,
        google_maps_link
      ),
      weekday_operating_time (
        restaurant_id,
        is_active,
        opening_time,
        closing_time,
        weekday_id,
        weekdays (id, name)
      )
    `
    )
    .eq('slug', slug);

  if (error) {
    console.log(error);
  }

  const typedData = data![0] as unknown as iRestaurantWithFKData;

  return typedData;
}
