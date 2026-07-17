/**
 * Tiny persisted settings store over AsyncStorage. Best-effort: a failed read or write
 * never throws, it just falls back to the in-memory default so the app can't break on it.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = {
  arabicScale: "settings.arabicScale",
  theme: "settings.theme",
} as const;

export async function loadSetting(key: keyof typeof KEY): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(KEY[key]);
  } catch {
    return null;
  }
}

export async function saveSetting(key: keyof typeof KEY, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY[key], value);
  } catch {
    // best-effort; a failed write just means it won't persist this time
  }
}
