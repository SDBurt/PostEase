import React from "react"
import Link from "next/link"
import useSWR from "swr"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Icons from "@/components/icons"

const fetcher = (url) => fetch(url).then((res) => res.json())

interface TwitterMetatagPreview {
  url: string
}

export default function TwitterMetatagPreview({ url }) {
  const { data, error, isLoading } = useSWR(
    `/api/preview?status=${url}`,
    fetcher
  )

  console.log("Valid url: ", url)

  if (isLoading) {
    return <Skeleton className="h-[150px] w-[150px]" />
  }

  if (error) {
    console.error(error)
  }

  if (data?.error) {
    console.error(error)
  }

  const { title, image, description } = data.data

  return (
    <Link href={url} target="_blank">
      <Card className="max-w-content group relative w-1/2 ">
        <CardContent className="p-4">
          {/* {image ? <Image src={image} alt={title} width={50} height={50}/> : null}
          <p>{image}</p> */}
          <img src={image} alt="Preview" className="rounded object-cover" />
          <CardHeader className="p-0 pb-2 pt-4">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        </CardContent>
        <div className="hidden group-hover:absolute group-hover:right-3 group-hover:top-3">
          <Button variant="default" size="icon" className="rounded-full">
            <Icons.close className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </Link>
  )
}
