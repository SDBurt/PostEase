import React from "react"
import {
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form"
import ReactTextareaAutosize from "react-textarea-autosize"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { editorFormSchema } from "@/lib/validations/editor"

import { MetaTagPreview } from "./metatags-preview"

type FormValues = z.infer<typeof editorFormSchema>

interface TwitterFormItemProps {
  form: UseFormReturn<FormValues>
  field: any
  index: number
  append?: UseFieldArrayAppend<FieldValues, "tweets">
  remove?: UseFieldArrayRemove
}

export function TwitterFormText({
  form,
  field,
  index,
  append,
  remove,
}: TwitterFormItemProps) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-center space-x-2">
        <ReactTextareaAutosize
          autoFocus
          placeholder="Tweet content"
          className="w-full resize-none appearance-none overflow-hidden rounded-lg bg-transparent p-3 text-sm outline outline-1 outline-muted focus:outline-1 focus:outline-primary"
          {...field}
          onChange={(e) => {
            field.onChange(e)
            form.setValue(`tweets.${index}.length`, e.target.value.length)
          }}
        />
        <p
          className={cn(
            "w-16 text-xs tracking-tight",
            form.getValues(`tweets.${index}.length`) > 280 && "text-destructive"
          )}
        >
          {form.getValues(`tweets.${index}.length`)} / 280
        </p>
      </div>

      <MetaTagPreview fieldName={field.name} control={form.control} />
    </div>
  )
}
