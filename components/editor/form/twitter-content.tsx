"use client"

import React from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useFieldArray } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Tweet from "@/components/admin/posts/twitter/tweet"
import Icons from "@/components/icons"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

dayjs.extend(relativeTime)

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
  form
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
              <FormLabel>
                Post Title
              </FormLabel>
              <FormControl>
              <Input
                  autoFocus
                  placeholder="Post Title"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div>
          <FormLabel>
            Tweets
          </FormLabel>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`tweets.${index}.text`}
              render={({ field }) => (
                <Tweet
                  imageUrl={imageUrl}
                  userName={userName}
                  handle={handle}
                  createdAt={new Date()}
                  isThread={
                    fields.length > 1 && index !== fields.length - 1
                  }
                  showTimestamp={false}
                >
                  <FormItem className="py-2">
                    <FormControl>
                      <div className="flex space-x-2">
                        <Textarea
                          autoFocus
                          placeholder="Tweet content"
                          rows={4}
                          {...field}
                        />
                        <Button
                          className="hover:bg-destructive hover:text-destructive-foreground hover:shadow-sm"
                          type="button"
                          variant="secondary"
                          size="xs"
                          onClick={() => remove(index)}
                        >
                          <Icons.close className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </Tweet>
              )}
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
