import { NextRequest, NextResponse } from "next/server"
import * as z from "zod"

import { getMetaTags } from "@/lib/utils"

const urlSchema = z.string().url()

type Tags = {
  title?: string | null
  description?: string | null
  image?: string | null
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams

  if (!searchParams.has("status")) {
    return NextResponse.json("no status parameter provider", { status: 400 })
  }

  let url = ""
  try {
    const status = searchParams.get("status")
    url = urlSchema.parse(status)
  } catch (err) {
    return NextResponse.json("invalid status parameter", { status: 400 })
  }

  let tags: Tags = {}
  try {
    tags = await getMetaTags(url)
    return NextResponse.json({ tags })
  } catch (err) {
    console.error("error during getMetaTags")
    return NextResponse.json("no tags", { status: 500 })
  }
}
