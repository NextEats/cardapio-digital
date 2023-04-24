import { createClient, PostgrestResponse } from '@supabase/supabase-js';
import axios from 'axios';
import { promiseAlert } from '../helpers/toasts';
import { IEditableProductReducerData } from '../reducers/EditableProductReducer/reducer';
import { Database } from '../types/supabase';

import {
  iInsertAdditionals,
  iInsertProductOptions,
  iRestaurant,
  iRestaurantWithFKData,
} from '../types/types';

if (!process.env.NEXT_PUBLIC_WHATSAPP_REST_SERVER_LINK) {
  console.error(
    'Please, add a valid value for the key: NEXT_PUBLIC_WHATSAPP_REST_SERVER_LINK in the .env file.'
  );
}

const dev = process.env.NODE_ENV !== 'production';

export const whatsappRestApiServerUrl =
  process.env.NEXT_PUBLIC_WHATSAPP_REST_SERVER_LINK;

export const serverURL = dev
  ? `http://localhost:3000/`
  : 'https://www.nexteats.com.br/';

export const whatsappRestApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WHATSAPP_REST_SERVER_LINK,
  timeout: 100000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export const calculateDistanceApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CALCULATE_DISTANCE_SERVER_LINK,
  timeout: 100000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export const api = axios.create({
  baseURL: serverURL,
});

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function updateAdditional(
  additionalId: number,
  picture_url: string,
  price: number,
  name: string
) {
  const additionalData = await supabase
    .from('additionals')
    .update({
      name,
      picture_url,
      price,
    })
    .eq('id', additionalId)
    .select('*');
  return additionalData;
}
export async function updateProduct(
  state: IEditableProductReducerData,
  productId: number,
  additionals: iInsertAdditionals['data']
) {
  const { description, name, price } = state.productInformation;

  const productData = await supabase
    .from('products')
    .upsert({
      id: productId,
      name,
      description,
      price: Number(price),
      picture_url: state.picture_url!,
      category_id: state.category.id!,
    })
    .select('*');
}

export async function deleteProductAdditionalsIfIsUpdatingProduct(
  additional_id: number,
  product_id: number
) {
  await supabase
    .from('product_additionals')
    .delete()
    .eq('additional_id', additional_id)
    .eq('product_id', product_id);
}

export async function createProductSelectIfIsUpdatingProduct(
  select_id: number,
  product_id: number
) {
  await supabase.from('product_selects').insert({ select_id, product_id });
}

export async function createIngredientIfIsUpdatingProduct(
  name: string,
  product_id: number
) {
  const ingredientData = await supabase
    .from('selects')
    .insert({ name })
    .select('*');
  await supabase
    .from('product_selects')
    .insert({ select_id: ingredientData.data![0].id, product_id });
}

export async function deleteIngredientIfIsUpdatingProduct(
  ingredient_id: number
) {
  await supabase
    .from('product_options')
    .delete()
    .eq('select_id', ingredient_id);
  await supabase
    .from('product_selects')
    .delete()
    .eq('select_id', ingredient_id);
}

export async function deleteProductOptionIfIsUpdatingProduct(id: number) {
  await supabase.from('product_options').delete().eq('id', id);
}
export async function createProductOptionIfIsUpdatingProduct(
  additional_id: number,
  name: string,
  picture_url: string
) {
  await supabase.from('product_options').insert({
    name,
    picture_url,
    select_id: additional_id,
  });
}

export async function createProductAdditionalsIfIsUpdatingProduct(
  additional_id: number,
  product_id: number
) {
  await supabase
    .from('product_additionals')
    .insert({ additional_id, product_id });
}

export async function createProduct(
  state: IEditableProductReducerData,
  productOptions: iInsertProductOptions['data'],
  additionals: iInsertAdditionals['data'],
  restaurant: iRestaurantWithFKData
) {
  // await supabase.storage.from("teste").upload("teste_4", file)
  if (!restaurant) {
    return;
  }

  const imageData = await supabase.storage
    .from('product-pictures')
    .upload(
      state.productInformation.name.toLocaleLowerCase(),
      state.picture_file!
    );
  const getImageData = supabase.storage
    .from('product-pictures')
    .getPublicUrl(imageData.data?.path!);
  const data = await supabase
    .from('products')
    .insert({
      category_id: state.category.id!,
      description: state.productInformation.description,
      name: state.productInformation.name,
      picture_url: getImageData.data.publicUrl!,
      price: Number(state.productInformation.price),
      restaurant_id: restaurant.id,
    })
    .select('*');

  if (data.data === null) {
    return;
  }

  postAdditionalToSupabase(data.data[0].id, state, additionals, restaurant);

  state.ingredients.forEach(async ingredient => {
    if (ingredient?.name === '') {
      return;
    }
    const productSelectaData = await supabase
      .from('product_selects')
      .insert({
        select_id: ingredient?.id,
        product_id: data.data[0].id,
      })
      .select('*');
  });
  postOptionToSupabase(state, productOptions);
  promiseAlert({
    pending: 'Aguarde um momento, estamos criando o produto.',
    success: 'Produto criado com sucesso!',
    error: 'Desculpe, Não foi possivel criar o produto!',
    data,
  });
}

async function postOptionToSupabase(
  state: IEditableProductReducerData,
  productOptions: iInsertProductOptions['data']
) {
  let optionStatus;
  state.options.forEach(async option => {
    if (
      option.name === '' ||
      productOptions.some(op => op.name === option.name)
    ) {
      return;
    }
    const optionData = await supabase
      .from('product_options')
      .insert({
        name: option.name,
        picture_url: option.picture_url,
        select_id: option.select_id,
      })
      .select('*');
    optionStatus = optionData.status;
  });
  window.location.reload();
  return optionStatus;
}

async function postAdditionalToSupabase(
  productId: number,
  state: IEditableProductReducerData,
  additionals: iInsertAdditionals['data'],
  restaurant: iRestaurant['data']
) {
  let data: PostgrestResponse<any>;
  state.additionals.forEach(async additional => {
    if (additional.name! === '') {
      return;
    }
    if (
      additionals.some(
        additionalValidate => additionalValidate.name === additional.name
      )
    ) {
      const productAdditionalDada = await supabase
        .from('product_additionals')
        .insert({
          additional_id: additional.id!,
          product_id: productId,
        })
        .select('*');
      data = productAdditionalDada;
    } else {
      const additionalData = await supabase
        .from('additionals')
        .insert({
          name: additional.name,
          picture_url: additional.picture_url,
          price: additional.price,
          restaurant_id: restaurant.id,
        })
        .select('*');

      if (additionalData.status === 400 || additionalData.data === null) {
        return;
      }
      const productAdditionalDada = await supabase
        .from('product_additionals')
        .insert({
          additional_id: additionalData.data[0]?.id!,
          product_id: productId,
        })
        .select('*');
      data = productAdditionalDada;
    }
  });
}

export async function getPaymentMethodsAvailable() {
  const { data: paymentMethods } = await supabase
    .from('payment_methods')
    .select('*');
  return paymentMethods;
}

export async function getPaymentMethodsForThisRestaurant(restaurantId: number) {
  try {
    const paymentMethods = await supabase.from('payment_methods').select('*');

    if (!paymentMethods.data) {
      throw new Error('No data returned from payment_methods table');
    }

    paymentMethods.data.map(async (paymentMethod, index) => {
      const paymentMethodsRestaurant = await supabase
        .from('payment_methods_restaurants')
        .select('*')
        .eq('payment_method_id', paymentMethod.id)
        .eq('restaurant_id', restaurantId);

      if (paymentMethodsRestaurant.data?.length === 0) {
        await supabase.from('payment_methods_restaurants').insert({
          payment_method_id: paymentMethod.id,
          restaurant_id: restaurantId,
        });
      }
    });

    const paymentMethodsRestaurant = await supabase
      .from('payment_methods_restaurants')
      .select(
        `id,
         created_at,
         payment_method_id,
         restaurant_id,
         is_active,
         payment_methods (
            id,
            name
        )`
      )
      .eq('restaurant_id', restaurantId);

    return paymentMethodsRestaurant;
  } catch (error) {
    console.error(error);
  }
}
