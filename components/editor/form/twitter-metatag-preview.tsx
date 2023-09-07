import React, { useEffect, useState } from "react"
import Link from "next/link"
import useSWR from "swr"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const fetcher = (url) => fetch(url).then((res) => res.json())

interface TwitterMetatagPreview {
  url: string
}

interface TwitterMetatagPreviewProps {
  url: string
}

type Tags = {
  title?: string | null
  description?: string | null
  image?: string | null
}

type PreviewResponseData = {
  tags: Tags
  error?: any
}

export default function TwitterMetatagPreview({
  url,
}: TwitterMetatagPreviewProps) {
  const { data, error, isLoading } = useSWR<PreviewResponseData>(
    `/api/preview?status=${url}`,
    fetcher
  )

  if (error || data?.error || !data) {
    return null
  }

  if (isLoading) {
    return <Skeleton className="h-[150px] w-full sm:w-[250px]" />
  }

  return (
    <>
      {data.tags && (
        <Card className="group relative w-full lg:w-[540px]">
          <CardContent className="p-4">
            {data.tags.image && (
              <img
                src={data.tags.image}
                alt="Preview"
                className="rounded object-cover pb-2"
              />
            )}
            <Link href={url} target="_blank">
              <CardHeader className="p-0 py-2">
                {data.tags.title && <CardTitle>{data.tags.title}</CardTitle>}
                {data.tags.description && (
                  <CardDescription>{data.tags.description}</CardDescription>
                )}
              </CardHeader>
            </Link>
          </CardContent>
        </Card>
      )}
    </>
  )
}
