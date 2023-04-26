import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { Database } from '../types/supabase';

if (!process.env.NEXT_PUBLIC_WHATSAPP_REST_SERVER_LINK) {
  console.error(
    'Please, add a valid value for the key: NEXT_PUBLIC_WHATSAPP_REST_SERVER_LINK in the .env file.'
  );
}

const dev = process.env.NODE_ENV !== 'production';

export const whatsappRestApiServerUrl =
  process.env.NEXT_PUBLIC_WHATSAPP_REST_SERVER_LINK;

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

export const serverURL = dev
  ? `http://localhost:3000/`
  : 'https://www.nexteats.com.br/';

export const api = axios.create({
  baseURL: 'https://www.nexteats.com.br/',
});

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
