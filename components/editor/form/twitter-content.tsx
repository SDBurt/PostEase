"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useFieldArray, useWatch } from "react-hook-form"
import ReactTextareaAutosize from "react-textarea-autosize"
import { useDebounce } from "use-debounce"
import * as z from "zod"

import { cn, containsURL, isValidUrl } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Tweet from "@/components/admin/posts/twitter/tweet"
import Icons from "@/components/icons"

import TwitterMetatagPreview from "./twitter-metatag-preview"

interface CloseButtonProps {
  onClickHandler: any
  content: string
}

function CloseButton({
  onClickHandler,
  content = "dismiss",
}: CloseButtonProps) {
  return (
    // hover:bg-destructive hover:text-destructive-foreground hover:shadow-sm
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          type="button"
          className={cn(
            buttonVariants({ variant: "secondary", size: "xs" }),
            "hover:bg-destructive hover:text-destructive-foreground hover:shadow-sm"
          )}
          onClick={onClickHandler}
        >
          <Icons.close className="h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent align="start" className="bg-background text-foreground">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const MetaTagPreview = ({ fieldName, control }) => {
  const [showPreview, setShowPreview] = useState(true)

  const result = useWatch({ control, name: fieldName })
  const [url] = useDebounce(containsURL(result), 1000)

  // show preview if url changes
  useEffect(() => {
    if (url && isValidUrl(url)) {
      setShowPreview(true)
    }
  }, [setShowPreview, url])

  if (!url || !isValidUrl(url)) {
    return null
  }

  return (
    <div className="group flex space-x-2">
      {showPreview ? (
        url ? (
          <>
            <TwitterMetatagPreview url={url} />
            <div className="group-hover:right-3 group-hover:top-3 group-hover:block">
              <CloseButton
                onClickHandler={() => setShowPreview(false)}
                content="Dismiss preview"
              />
            </div>
          </>
        ) : null
      ) : null}
    </div>
  )
}

const TwitterFormContentSchema = z.object({
  tweets: z.array(
    z.object({
      text: z.string().min(1).max(280),
    })
  ),
})

type TwitterFormContentValues = z.infer<typeof TwitterFormContentSchema>

interface TwitterFormContentProps {
  imageUrl: string
  userName: string
  handle: string
  form: any
}

export default function TwitterFormContent({
  imageUrl,
  userName,
  handle,
  form,
}: TwitterFormContentProps) {
  const { fields, append, remove } = useFieldArray<TwitterFormContentValues>({
    name: "tweets",
    control: form.control,
  })

  return (
    <div className="grid w-full gap-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Post Title</FormLabel>
            <FormControl>
              <Input autoFocus placeholder="Post Title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div>
        <FormLabel>Tweets</FormLabel>
        {fields.map((field, index) => (
          <FormField
            control={form.control}
            key={field.id}
            name={`tweets.${index}.text`}
            render={({ field }) => {
              return (
                <Tweet
                  imageUrl={imageUrl}
                  userName={userName}
                  handle={handle}
                  createdAt={new Date()}
                  isThread={fields.length > 1 && index !== fields.length - 1}
                  showTimestamp={false}
                >
                  <FormItem className="py-2">
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <div className="flex space-x-2">
                          <ReactTextareaAutosize
                            autoFocus
                            placeholder="Tweet content"
                            className="w-full resize-none appearance-none overflow-hidden rounded-lg bg-transparent p-3 text-sm outline outline-1 outline-muted focus:outline-1 focus:outline-primary"
                            {...field}
                          />
                          <CloseButton
                            onClickHandler={() => remove(index)}
                            content="Remove"
                          />
                        </div>
                        <MetaTagPreview
                          fieldName={field.name}
                          control={form.control}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </Tweet>
              )
            }}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => append({ text: "" })}
        >
          Add Tweet
        </Button>
      </div>
    </div>
  )
}
