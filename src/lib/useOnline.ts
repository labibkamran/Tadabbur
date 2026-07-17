/**
 * useOnline — network reachability via NetInfo. Only Ask needs it; the curated surfaces
 * work offline by design. Defaults to online so nothing is blocked before the first read.
 */

import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export function useOnline(): boolean {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const sub = NetInfo.addEventListener((s) => {
      setOnline(s.isConnected !== false && s.isInternetReachable !== false);
    });
    return () => sub();
  }, []);

  return online;
}
