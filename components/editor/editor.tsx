"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Post, Status } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { MutatePost, SelectPost, SelectSchedule } from "@/types/db"
import { adminConfig } from "@/config/admin"
import dayjs from "@/lib/dayjs"
import { updatePost } from "@/lib/db/actions/post"
import { cn } from "@/lib/utils"
import { editorFormSchema } from "@/lib/validations/editor"

import EditorNav from "../admin/nav/editor-nav"
import { BadgeGroup } from "../admin/posts/post-badge-group"
import Icons from "../icons"
import { Button, buttonVariants } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Form } from "../ui/form"
import { Skeleton } from "../ui/skeleton"
import { toast } from "../ui/use-toast"
import { ScheduleContent } from "./form/schedule/schedule-content"
import TwitterFormContent from "./form/twitter/twitter-form-content"

type FormValues = z.infer<typeof editorFormSchema>

const formDefaults: Partial<FormValues> = {
  title: "",
  tweets: [{ text: "", length: 0, images: [] }],
  publishToTwitter: false,
  publishToLinkedin: false,
  linkedinContent: "",
  schedulePost: false,
  scheduledAtDate: null,
}

interface EditorProps {
  user: {
    imageUrl: string
    userName: string
    twitterHandle: string
  }
  post: SelectPost
  schedules: SelectSchedule[]
}

function mapPostToForm(
  post: SelectPost,
  isScheduledAt: string | null
): Partial<FormValues> {
  const tweets = post.content
    ? post.content.map((text) => ({
        text: text,
        length: text.length,
        images: [],
      }))
    : formDefaults.tweets

  const schedulePost = post.status
    ? post.status !== Status.DRAFT
    : formDefaults.schedulePost

  const scheduledAtDate =
    (post.scheduledAt && dayjs(post.scheduledAt).startOf("day").toDate()) ||
    (isScheduledAt && new Date(isScheduledAt)) ||
    formDefaults.scheduledAtDate

  const scheduledAt =
    (post.scheduledAt && dayjs(post.scheduledAt).format()) ||
    isScheduledAt ||
    formDefaults.scheduledAt ||
    null

  return {
    title: post.title || formDefaults.title,
    tweets: tweets || formDefaults.tweets,
    publishToTwitter: formDefaults.publishToTwitter,
    publishToLinkedin: formDefaults.publishToLinkedin,
    linkedinContent: formDefaults.linkedinContent,
    schedulePost: schedulePost || formDefaults.schedulePost,
    scheduledAtDate: scheduledAtDate || formDefaults.scheduledAtDate,
    scheduledAt: scheduledAt || formDefaults.scheduledAt,
  }
}

function postScheduledStatusHandler(schedulePost, scheduledAt) {
  const result: Pick<Post, "status" | "scheduledAt"> = {
    status: Status.DRAFT,
    scheduledAt: null,
  }
  if (!schedulePost || !scheduledAt) {
    result["status"] = Status.DRAFT
    result["scheduledAt"] = null
  } else if (schedulePost && scheduledAt) {
    result["status"] = Status.SCHEDULED as Status
    result["scheduledAt"] = scheduledAt
  }

  return result
}

function postTwitterDataHandler(data: FormValues): MutatePost {
  // Iterate each content key in data and map results to actions

  // map tweets to record content

  const posts: MutatePost = {
    title: data.title,
    content: data.tweets.map((tweet) => tweet.text),
    ...postScheduledStatusHandler(data.schedulePost, data.scheduledAt),
  }

  console.log(posts)

  return posts
}

export function Editor({ post, user, schedules }: EditorProps) {
  const searchParams = useSearchParams()
  const tabName = searchParams?.has("tabName")
    ? searchParams.get("tabName")
    : "editor"
  const isScheduledAt = searchParams?.has("scheduledAt")
    ? searchParams.get("scheduledAt")
    : null

  const [isSaving, setIsSaving] = useState(false)

  const defaultValues: Partial<FormValues> = mapPostToForm(post, isScheduledAt)

  const form = useForm<FormValues>({
    resolver: zodResolver(editorFormSchema),
    defaultValues,
    mode: "onChange",
  })

  React.useEffect(() => {
    console.log("form errors: ", form.formState.errors)
  }, [form.formState])

  async function onSubmit(data: FormValues) {
    setIsSaving(true)

    console.log("SAVING: ", data)

    try {
      const updatedData = postTwitterDataHandler(data)

      const result = await updatePost(post?.id, updatedData)

      setIsSaving(false)

      if (!result || result.id !== post?.id) {
        return toast({
          title: "Unsuccessful",
          variant: "destructive",
          description: <p>{`Unable to update ${post.title}`}</p>,
        })
      }

      return toast({
        title: `Success updated ${updatedData["status"].toLowerCase()} post`,
        description: <p>{`Updated ${post.title} successfully!`}</p>,
      })
    } catch (err) {
      console.log(err)
      setIsSaving(false)
      return toast({
        title: "Unsuccessful",
        variant: "destructive",
        description: (
          <p>{`Something went wrong. Unable to update ${post.title}`}</p>
        ),
      })
    }
  }

  let tabContent = <Skeleton className="h-[20px] w-[100px]" />

  switch (tabName) {
    case "schedule":
      tabContent = <ScheduleContent form={form} schedules={schedules} />
      break
    default:
      tabContent = (
        <TwitterFormContent
          form={form}
          imageUrl={user.imageUrl}
          userName={user.userName}
          handle={user.twitterHandle}
        />
      )
      break
  }

  return (
    <div className="container flex w-full flex-col">
      <div className="mb-3 flex w-full items-center justify-between">
        <div className="flex items-center space-x-10">
          <Link
            href="/admin/posts/draft"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <>
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              All Draft Posts
            </>
          </Link>
        </div>
        {post && <BadgeGroup post={post} />}
        <div className=" flex items-center space-x-4">
          <Button type="button" onClick={form.handleSubmit(onSubmit)}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </Button>
        </div>
      </div>

      <div className="grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-1 flex-col md:flex ">
          <EditorNav items={adminConfig.editorNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden pt-16 md:pt-4">
          <Card className="bg-transparent">
            <CardContent className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {tabContent}
                </form>
              </Form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
