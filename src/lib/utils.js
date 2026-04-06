import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getCalendlyUrl() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const YYYYMM = `${year}-${month}`;
  return `https://calendly.com/shyanil-tageasy/30min?back=1&month=${YYYYMM}`;
}
