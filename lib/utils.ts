import { clsx, type ClassValue } from "clsx"
import { parse } from "node-html-parser"
import { twMerge } from "tailwind-merge"

import dayjs from "@/lib/dayjs"

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

export function dateFromNow(
  date: string | number | Date | dayjs.Dayjs
): string {
  return dayjs(date).fromNow()
}

export function dayRange(date: Date): string[] {
  let ranges: string[] = []
  let currentDate = dayjs(date).startOf("day")
  let endDate = currentDate.add(7, "day")

  while (currentDate.isBefore(endDate)) {
    ranges.push(currentDate.format())
    currentDate = currentDate.add(1, "day")
  }

  return ranges
}

const urlRegex =
  "((http|https)+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?" // OLD

export const containsURL = (text: string) => {
  const regex = new RegExp(urlRegex)
  const result = text.match(regex)

  if (!result || result.length === 0) {
    return null
  }

  const newUrl = result[0]

  if (!(newUrl.startsWith("http://") || newUrl.startsWith("https://"))) {
    return "https://" + newUrl
  }

  return newUrl
}

export function dayFormat(date: string | number | Date | dayjs.Dayjs): string {
  return dayjs(date).format("dddd, MMMM D, YYYY")
}

export function dayFormatTime(
  date: string | number | Date | dayjs.Dayjs
): string {
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

export function makeDateTimeSelect(): {
  label: string
  value: { h: number; m: number }
}[] {
  const ampm = ["AM", "PM"]
  const hours = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
  ]
  const minutes = ["00", "15", "30", "45"]

  const result: { label: string; value: { h: number; m: number } }[] = []

  ampm.forEach((ap) => {
    hours.forEach((hour) => {
      minutes.forEach((minute) => {
        result.push({
          label: `${hour}:${minute} ${ap}`,
          value: {
            h: ap == "AM" ? parseInt(hour) : parseInt(hour) + 12,
            m: parseInt(minute),
          },
        })
      })
    })
  })

  return result
}

export const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

const getHtml = async (url: string) => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // timeout if it takes longer than 5 seconds
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "postease-bot/1.0",
      },
    })
    clearTimeout(timeoutId)

    return await response.text()
  } catch (error) {
    // if (error.name === "AbortError") {
    //   // Handle fetch request abort (e.g., due to timeout)
    //   console.error("Fetch request aborted due to timeout.")
    // } else {
    //   // Handle other fetch errors
    //   console.error("Fetch request failed:", error)
    // }
    return null
  }
}

const getHeadChildNodes = (html) => {
  const ast = parse(html) // parse the html into AST format with node-html-parser
  const metaTags = ast.querySelectorAll("meta").map(({ attributes }) => {
    const property = attributes.property || attributes.name || attributes.href
    return {
      property,
      content: attributes.content,
    }
  })
  const title = ast.querySelector("title")?.innerText
  const linkTags = ast.querySelectorAll("link").map(({ attributes }) => {
    const { rel, href } = attributes
    return {
      rel,
      href,
    }
  })

  return { metaTags, title, linkTags }
}

const getRelativeUrl = (url: string, imageUrl: string) => {
  if (!imageUrl) {
    return null
  }
  if (isValidUrl(imageUrl)) {
    return imageUrl
  }
  const { protocol, host } = new URL(url)
  const baseURL = `${protocol}//${host}`
  return new URL(imageUrl, baseURL).toString()
}

export const getMetaTags = async (url: string) => {
  const html = await getHtml(url)
  if (!html) {
    return {
      title: url,
      description: "No description",
      image: null,
    }
  }
  const { metaTags, title: titleTag, linkTags } = getHeadChildNodes(html)

  let object = {}

  for (let k in metaTags) {
    let { property, content } = metaTags[k]

    property && (object[property] = content)
  }

  for (let m in linkTags) {
    let { rel, href } = linkTags[m]

    rel && (object[rel] = href)
  }

  const title: string | null =
    object["og:title"] || object["twitter:title"] || titleTag

  const description: string | null =
    object["description"] ||
    object["og:description"] ||
    object["twitter:description"]

  const image: string =
    object["og:image"] ||
    object["twitter:image"] ||
    object["image_src"] ||
    object["icon"] ||
    object["shortcut icon"]

  return {
    title: title || url,
    description: description || "No description",
    image: getRelativeUrl(url, image),
  }
}
