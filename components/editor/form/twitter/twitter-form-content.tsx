"use client"

import React from "react"
import { useFieldArray, UseFormReturn } from "react-hook-form"
import * as z from "zod"

import { editorFormSchema } from "@/lib/validations/editor"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Tweet from "@/components/admin/posts/twitter/tweet"
import Icons from "@/components/icons"

import TweetField from "./field/tweet"
import { FormButton } from "./form-button"

type FormValues = z.infer<typeof editorFormSchema>

interface TwitterFormContentProps {
  form: UseFormReturn<FormValues>
  imageUrl: string
  userName: string
  handle: string
}

export default function TwitterFormContent({
  form,
  imageUrl,
  userName,
  handle,
}: TwitterFormContentProps) {
  const { fields, append, insert, remove } = useFieldArray<FormValues>({
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
        {fields.map((field, index) => {
          const isLastItem = index === fields.length - 1
          const addItemAction = isLastItem
            ? append
            : (value) => insert(index + 1, value)
          return (
            <Tweet
              key={field.id}
              imageUrl={imageUrl}
              userName={userName}
              handle={handle}
              createdAt={new Date()}
              isThread={fields.length > 1 && index !== fields.length - 1}
              showTimestamp={false}
            >
              <TweetField form={form} index={index}>
                <FormButton
                  onClickHandler={() =>
                    addItemAction({ text: "", length: 0, images: [] })
                  }
                  content={
                    isLastItem ? "Add Tweet at end" : "Insert Tweet Below"
                  }
                >
                  <Icons.add className="h-4 w-4" />
                </FormButton>

                <FormButton
                  onClickHandler={() => remove(index)}
                  content="Remove Tweet"
                  isDestructive
                >
                  <Icons.close className="h-4 w-4" />
                </FormButton>
              </TweetField>
            </Tweet>
          )
        })}
      </div>
    </div>
  )
}
