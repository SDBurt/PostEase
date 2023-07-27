"use client"

import React, { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Post } from "@prisma/client"
import { useFieldArray, useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import * as z from "zod"

import { updatePost } from "@/lib/db/actions"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import Tweet from "@/components/admin/posts/twitter/tweet"
import Icons from "@/components/icons"

const twitterFormSchema = z.object({
  tweets: z.array(
    z.object({
      text: z.string().min(1).max(280),
    })
  ),
})

type TwitterFormValues = z.infer<typeof twitterFormSchema>

interface TwitterFormProps {
  imageUrl: string
  userName: string
  handle: string
  post?: Pick<Post, "id" | "content" | "status">
}

export default function TwitterForm({
  imageUrl,
  userName,
  handle,
  post,
}: TwitterFormProps) {
  const [isSaving, setIsSaving] = useState(false)

  const defaultValues: Partial<TwitterFormValues> = {
    tweets:
      post.content && post.content.length > 0
        ? post.content.map((text) => ({ text: text }))
        : [{ text: "" }],
  }

  const form = useForm<TwitterFormValues>({
    resolver: zodResolver(twitterFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray<TwitterFormValues>({
    name: "tweets",
    control: form.control,
  })

  async function onSubmit(data: TwitterFormValues) {
    setIsSaving(true)

    try {
      const updatedData = { content: data.tweets.map((tweet) => tweet.text) }
      console.log(updatedData)
      const result = await updatePost(post.id, updatedData)

      setIsSaving(false)

      if (!result || result.id !== post.id) {
        return toast({
          title: "Something went wrong. You submitted the following values:",
          variant: "destructive",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(updatedData, null, 2)}
              </code>
            </pre>
          ),
        })
      }

      return toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(updatedData, null, 2)}
            </code>
          </pre>
        ),
      })
    } catch (err) {
      setIsSaving(false)
      return toast({
        title: "Something went wrong.",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(err, null, 2)}</code>
          </pre>
        ),
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid w-full gap-10">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-10">
              <Link
                href="/admin"
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                <>
                  <Icons.chevronLeft className="mr-2 h-4 w-4" />
                  Back
                </>
              </Link>
              <p className="text-sm text-muted-foreground">
                {post.status === "PUBLISHED" ? "Published" : "Draft"}
              </p>
            </div>
            <Button type="submit">
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Save</span>
            </Button>
          </div>
          <div className="mx-auto w-[800px]">
            <div>
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
                      <FormItem>
                        <FormControl>
                          <div className="flex space-x-2">
                            <TextareaAutosize
                              autoFocus
                              placeholder="Tweet content"
                              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-muted-foreground focus:text-primary focus:outline-none"
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
        </div>
      </form>
    </Form>
  )
}