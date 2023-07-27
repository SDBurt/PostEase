import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function dateFromNow(date: Date): string {

  dayjs().format();
  dayjs.extend(relativeTime);

  return dayjs(date).fromNow()
}