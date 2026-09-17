import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Automatically converts Eastern Arabic / Persian numerals and Arabic commas
 * to standard English ASCII numbers, filtering out non-digit characters.
 */
export function toEnglishDigits(val: string, allowDecimal = true): string {
  if (!val) return "";
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  let converted = val;
  for (let i = 0; i < 10; i++) {
    converted = converted.split(arabicDigits[i]).join(i.toString());
    converted = converted.split(persianDigits[i]).join(i.toString());
  }
  converted = converted.replace(/[،,٫]/g, ".");

  if (allowDecimal) {
    let result = "";
    let hasDot = false;
    for (const char of converted) {
      if (char >= "0" && char <= "9") {
        result += char;
      } else if (char === "." && !hasDot) {
        result += ".";
        hasDot = true;
      }
    }
    return result;
  } else {
    return converted.replace(/[^0-9]/g, "");
  }
}
