/**
 * The authenticated app — four tabs (Today, Sakina, Ask, Read) sharing one bottom bar.
 * Today is the initial tab.
 */

import { TabBar } from "@/components/tabBar";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="today" />
      <Tabs.Screen name="sakina" />
      <Tabs.Screen name="ask" />
      <Tabs.Screen name="read" />
    </Tabs>
  );
}
