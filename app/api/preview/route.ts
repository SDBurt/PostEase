import { NextRequest, NextResponse } from "next/server"
import { parse } from "node-html-parser"
import * as z from "zod"

const urlSchema = z.string().url()

export const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (e) {
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
    if (error.name === "AbortError") {
      // Handle fetch request abort (e.g., due to timeout)
      console.error("Fetch request aborted due to timeout.")
    } else {
      // Handle other fetch errors
      console.error("Fetch request failed:", error)
    }
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

  const title = object["og:title"] || object["twitter:title"] || titleTag

  const description =
    object["description"] ||
    object["og:description"] ||
    object["twitter:description"]

  const image =
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

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams

  if (!searchParams.has("status")) {
    console.log("no status")
    return NextResponse.json(
      { error: "no status parameter provider" },
      { status: 400 }
    )
  }

  let url = ""
  try {
    const status = searchParams.get("status")
    url = urlSchema.parse(status)
  } catch (err) {
    return NextResponse.json(
      { error: "invalid status parameter" },
      { status: 400 }
    )
  }

  const tags = await getMetaTags(url)

  return NextResponse.json({ message: "success", data: tags })
}
