/**
 * Supabase client for the app. Uses the publishable key (sb_publishable_…) — safe on the
 * device, gated by RLS. Session is persisted in AsyncStorage and auto-refreshed. Auth only:
 * data goes through the Next.js API, not straight to Supabase.
 */
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error(
    "Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY in Tadabbur/.env"
  );
}

export const supabase = createClient(url, key, {
  auth: {
    storage: AsyncStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false, // native: no URL to read a session from
    flowType: "pkce",
  },
});
