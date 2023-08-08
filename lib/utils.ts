import { clsx, type ClassValue } from "clsx"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import calendar from "dayjs/plugin/calendar"
import { twMerge } from "tailwind-merge"

dayjs().format()
dayjs.extend(relativeTime)
dayjs.extend(calendar)

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

export function dateFromNow(date: string | number | Date | dayjs.Dayjs): string {
  return dayjs(date).fromNow()
}

export function dayRange(date: Date): string[] {
  let ranges: string[] = []
  let currentDate = dayjs(date).startOf('day');
  let endDate = currentDate.add(7, 'day')
  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
    currentDate = currentDate.add(1, 'day');
    ranges.push(currentDate.format());
  }
  return ranges
}


export function dayFormat(date: string | number | Date | dayjs.Dayjs): string {
  return dayjs(date).format("dddd, MMMM D, YYYY")
}

export function dayFormatTime(date: string | number | Date | dayjs.Dayjs): string {
  return dayjs(date).format("h:mm A")
}

export function dayDate(date: string | number | Date | dayjs.Dayjs): number {
  return dayjs(date).date()
}

export function dayMonth(date: string | number | Date | dayjs.Dayjs): number {
  return dayjs(date).month()
}
export function dayYear(date: string | number | Date | dayjs.Dayjs): number {
  return dayjs(date).year()
}

export function dayOfWeek(date: string | number | Date | dayjs.Dayjs): number {
  return dayjs(date).day()
}


export function makeDateTimeSelect(): {label: string, value: {h: number, m: number}}[] {
  
  const ampm = ["AM", "PM"]
  const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"]
  const minutes = ["00", "15", "30", "45"]
  
  const result = []

  ampm.forEach(ap => {
    hours.forEach(hour => {
      minutes.forEach(minute => {
        result.push({label: `${hour}:${minute} ${ap}`, value: {h: ap == "AM" ? parseInt(hour) : parseInt(hour) + 12, m: parseInt(minute)}})
      })
    })
  })
  
  return result
}
