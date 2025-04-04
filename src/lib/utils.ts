import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type BrowserName = "Chrome" | "Firefox" | "Safari" | "Edge" | "Opera" | "Internet Explorer" | "Unknown";

export function getBrowserNameFromUserAgent(userAgent: string): BrowserName {
  if (!userAgent) return "Unknown";

  if (/\bEdgA?\//i.test(userAgent)) return "Edge";
  if (/\bOPR\//i.test(userAgent)) return "Opera";
  if (/\bMSIE |Trident\//i.test(userAgent)) return "Internet Explorer";
  if (/\bFirefox\//i.test(userAgent)) return "Firefox";
  if (/\bChrome\/(?!.*Edg)/i.test(userAgent)) return "Chrome";
  if (/\bSafari\//i.test(userAgent) && !/\bChrome\//i.test(userAgent)) return "Safari";

  return "Unknown";
}
