/**
 * BFF client — every data call goes through the Next.js API with the user's Supabase access
 * token attached. Data never hits Supabase straight from the device; the server verifies the
 * token and does the work. Reused by all data routes as they land.
 */
import { supabase } from "@/lib/supabase";

const BASE = process.env.EXPO_PUBLIC_API_URL;

export async function apiGet<T>(path: string): Promise<T> {
  if (!BASE) throw new Error("Missing EXPO_PUBLIC_API_URL in Tadabbur/.env");
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const res = await fetch(`${BASE}${path}`, {
    headers: session ? { Authorization: `Bearer ${session.access_token}` } : {},
  });
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`);
  return (await res.json()) as T;
}
