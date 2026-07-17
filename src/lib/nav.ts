/**
 * Back navigation that never dispatches an unhandled GO_BACK. Falls back to a home route
 * when there is nothing to return to — a screen reached by deep link, or a dev reload
 * that lands straight on it with an empty stack.
 */

import { router, type Href } from "expo-router";

export function goBack(fallback: Href) {
  if (router.canGoBack()) router.back();
  else router.replace(fallback);
}
