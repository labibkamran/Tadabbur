/**
 * cn() — merge class names, letting a caller's className override a component's.
 * The RNR CLI imports this but doesn't create it.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
