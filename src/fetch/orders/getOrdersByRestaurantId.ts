import { supabase } from "../../server/api";
import { iOrdersWithFKData } from "../../types/types";

export async function getOrdersByRestaurantIdFetch(
  restaurant_id: number | undefined
): Promise<iOrdersWithFKData[]> {
  let { data, error } = await supabase
    .from("orders")
    .select(
      `
    id,
    created_at,
    cash_box_id,
    payment_methods (
        id,
        name
    ),
    order_types (
        id,
        name
    ),
    clients (
        id,
        name,
        addresses (
            id,
            cep,
            number
        ),
        contacts (
            id,
            email,
            phone
        )
    ),
    order_status (
        id,
        status_name
    ),
    delivery_fees (
        id,
        start_km,
        end_km,
        fee
    )
    `
    )
    .eq("restaurant_id", restaurant_id);

  return data! as unknown as iOrdersWithFKData[];
}
