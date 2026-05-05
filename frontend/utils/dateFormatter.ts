const NEPALI_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

export function toNepaliDigits(num: number | string): string {
  return String(num)
    .split("")
    .map((d) => (isNaN(Number(d)) ? d : NEPALI_DIGITS[Number(d)]))
    .join("");
}

export function formatBsDate(year: number, month: number, day: number): string {
  return `${toNepaliDigits(year)}-${toNepaliDigits(month)}-${toNepaliDigits(day)}`;
}

export function formatAdDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
