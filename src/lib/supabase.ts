import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);
export const isSupabaseStorageReady = !!(supabaseUrl && supabaseServiceKey);

// Public client for standard client-side interactions or anonymous reads
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Admin client for high-privilege backend workflows (e.g. bypassing RLS on server uploads)
export const supabaseAdmin = isSupabaseStorageReady
  ? createClient(supabaseUrl!, supabaseServiceKey!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

if (!isSupabaseConfigured && process.env.NODE_ENV !== "production") {
  console.warn("⚠️ Supabase: Environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are missing. Falling back to local SQLite and disk storage.");
}
