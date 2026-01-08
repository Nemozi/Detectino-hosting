import { createClient } from '@supabase/supabase-js'

console.log("HARDCODE URL TEST");
console.log("ENV URL:", import.meta.env.VITE_SUPABASE_URL);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("supabaseUrl =", supabaseUrl ?? "NOPE");
console.log("supabaseAnonKey =", supabaseAnonKey ?? "NOPE");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
