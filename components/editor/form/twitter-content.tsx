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
import ImageInputButton from "@/components/image-input-button"
import ImageInputPreview from "@/components/image-preview"

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
    <div>
      {debouncedUrl ? (
        <PreviewContainer show={showPreview} setShow={setShowPreview}>
          <TwitterMetatagPreview url={debouncedUrl} />
        </PreviewContainer>
      ) : null}
    </div>
  )
}

export const ImagePreview = ({ imagePrevew }) => {
  const [showPreview, setShowPreview] = useState(false)
  const [deboucedImagePreview] = useDebounce(imagePrevew, 1000)

  // show preview if url changes
  useEffect(() => {
    if (deboucedImagePreview) {
      setShowPreview(true)
    }
  }, [setShowPreview, deboucedImagePreview])

  if (!deboucedImagePreview) {
    return null
  }

  return (
    <div>
      {deboucedImagePreview ? (
        <PreviewContainer show={showPreview} setShow={setShowPreview}>
          <ImageInputPreview filePreview={deboucedImagePreview} />
        </PreviewContainer>
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
  form,
  imageUrl,
  userName,
  handle,
}: TwitterFormContentProps) {
  const { fields, append, remove, update } =
    useFieldArray<TwitterFormContentValues>({
      name: "tweets",
      control: form.control,
    })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleFileSelect = (file: File) => {
    // Handle the selected file here, e.g., upload it to a server
    if (file) {
      console.log("Selected File:", file)

      // Create a data URL for image preview
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

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
                            onChange={(e) => {
                              field.onChange(e)
                              form.setValue(
                                `tweets.${index}.length`,
                                e.target.value.length
                              )
                            }}
                          />
                          <CloseButton
                            onClickHandler={() => remove(index)}
                            content="Remove"
                          />
                        </div>
                        <p>{form.getValues(`tweets.${index}.length`)}</p>
                        <MetaTagPreview
                          fieldName={field.name}
                          control={form.control}
                        />
                        <ImagePreview imagePrevew={imagePreview} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </Tweet>
              )
            }}
          />
        ))}

        {/* Controls */}
        <div className="mt-2 flex space-x-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => append({ text: "" })}
          >
            <Icons.add className="h-4 w-4" />
          </Button>
          <ImageInputButton onFileSelect={handleFileSelect} />
        </div>
      </div>
    </div>
  )
}
