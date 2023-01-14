import { createClient } from "@supabase/supabase-js";
import { Database } from "../server/schema"

export const supabase = createClient<typeof Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);
