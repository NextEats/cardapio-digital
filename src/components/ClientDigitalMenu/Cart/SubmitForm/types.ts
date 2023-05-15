import { iProductReducerInterface } from '@/src/contexts/DigitalMenuContext';
import { iRestaurantWithFKData } from '@/src/types/iRestaurant';
import { SetStateAction } from 'react';

export interface iSubmitForm {
  products: iProductReducerInterface;
  setOrderNumber: React.Dispatch<SetStateAction<number | undefined>>;
  setDeliveryFee: React.Dispatch<SetStateAction<number>>;
  restaurant: iRestaurantWithFKData;
  payment_method: number;
  change_value: number;
  deliveryForm: number;
  name: string;
  number: string;
  cep: number;
  whatsapp: number;
  complement: string | null;
  neighborhood: string;
  street: string;
}
