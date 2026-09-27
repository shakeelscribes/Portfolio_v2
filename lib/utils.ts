import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * shadcn's class-name helper: clsx for conditionals, tailwind-merge so a
 * caller's utility beats the component's default (cn("px-2", "px-4") -> "px-4").
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
