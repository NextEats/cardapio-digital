import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { Database } from "../types/supabase";

export const api = axios.create({
  baseURL: "http://localhost:3000"
})

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);
