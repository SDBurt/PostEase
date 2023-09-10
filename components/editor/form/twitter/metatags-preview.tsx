"use client"

import React, { useEffect, useState } from "react"
import { useWatch } from "react-hook-form"
import { useDebounce } from "use-debounce"

import { containsURL, isValidUrl } from "@/lib/utils"

import { CloseButton } from "./close-button"
import TwitterMetatagPreview from "./twitter-metatag-preview"

interface PreviewContainerProps {
  show: boolean
  setShow: (value) => void
  children: React.ReactNode
}

export const PreviewContainer = ({
  show,
  setShow,
  children,
}: PreviewContainerProps) => {
  return (
    <div>
      {show ? (
        <div className="group relative flex w-full space-x-2 lg:w-[540px]">
          {children}
          <div className="absolute right-3 top-3 hidden group-hover:block">
            <CloseButton
              onClickHandler={() => setShow(false)}
              content="Dismiss"
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export const MetaTagPreview = ({ fieldName, control }) => {
  const [showPreview, setShowPreview] = useState(false)

  const result = useWatch({ control, name: fieldName })
  const [debouncedUrl] = useDebounce(containsURL(result), 1000)

  // show preview if url changes
  useEffect(() => {
    if (debouncedUrl && isValidUrl(debouncedUrl)) {
      setShowPreview(true)
    }
  }, [setShowPreview, debouncedUrl])

  if (!debouncedUrl || !isValidUrl(debouncedUrl)) {
    return null
  }

  return (
    <>
      {debouncedUrl ? (
        <PreviewContainer show={showPreview} setShow={setShowPreview}>
          <TwitterMetatagPreview url={debouncedUrl} />
        </PreviewContainer>
      ) : null}
    </>
  )
}
