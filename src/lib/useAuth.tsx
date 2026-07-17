/**
 * Auth — the Supabase session as context, with Google sign-in and sign-out. Same shape as
 * the app's other providers (useThemePreference, useArabicScale). Google OAuth opens the
 * system browser, catches the redirect back, and exchanges the code for a session (PKCE).
 */
import { apiGet } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";

WebBrowser.maybeCompleteAuthSession();

const redirectTo = Linking.createURL("/auth/callback");

type Profile = { name: string; email: string | null };

type Auth = {
  session: Session | null;
  loading: boolean;
  profile: Profile | null;
  initials: string;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const toInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const AuthContext = React.createContext<Auth | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<Session | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [profile, setProfile] = React.useState<Profile | null>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  // profile lives in context so every screen (Today, Ask, Profile) shows the same user
  React.useEffect(() => {
    if (!session) {
      setProfile(null);
      return;
    }
    apiGet<Profile>("/api/profile")
      .then(setProfile)
      .catch(() => setProfile(null));
  }, [session]);

  const signInWithGoogle = React.useCallback(async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo, skipBrowserRedirect: true },
    });
    if (error) throw error;

    // opens Google; the tadabbur://auth/callback deep link (app/auth/callback.tsx)
    // exchanges the returned code for a session and lands in the app
    await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  }, []);

  const signOut = React.useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const initials = profile?.name ? toInitials(profile.name) : "G";

  const value = React.useMemo(
    () => ({ session, loading, profile, initials, signInWithGoogle, signOut }),
    [session, loading, profile, initials, signInWithGoogle, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): Auth {
  const ctx = React.useContext(AuthContext);
  if (ctx === null) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
