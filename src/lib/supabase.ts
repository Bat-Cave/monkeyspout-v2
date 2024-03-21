import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default createClient<Database>(url || "", key || "");
