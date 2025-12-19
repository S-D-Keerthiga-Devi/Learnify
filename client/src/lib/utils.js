import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to conditionally join Tailwind CSS classes.
 * Combines clsx + tailwind-merge for clean className merging.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
