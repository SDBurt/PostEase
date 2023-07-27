"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Post } from "@prisma/client"
// import { updatePost } from "@/lib/db/actions"

import { EditorContent, useEditor } from "@tiptap/react"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import * as z from "zod"

import { insertPostSchema } from "@/lib/db/validation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { EditorBubbleMenu } from "./components/EditorBubbleMenu"
import DEFAULT_EDITOR_CONTENT from "./default-content"
import { TiptapExtensions } from "./extensions"
import { TiptapEditorProps } from "./props"

interface EditorProps {
  post: Pick<Post, "id" | "title" | "text" | "status">
}

type FormData = z.infer<typeof insertPostSchema>

export function Editor({ post }: EditorProps) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(insertPostSchema),
  })

  const router = useRouter()

  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [content, setContent] = React.useState(DEFAULT_EDITOR_CONTENT)

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    content: content,
    autofocus: "end",
  })

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    console.log(data)

    // const result = await updatePost(post.id, data)

    // console.log(result)

    setIsSaving(false)

    // if (!response?.ok) {
    //   return toast({
    //     title: "Something went wrong.",
    //     description: "Your post was not saved. Please try again.",
    //     variant: "destructive",
    //   })
    // }

    router.refresh()

    // return toast({
    //   description: "Your post has been saved.",
    // })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              {post.status === "published" ? "Published" : "Draft"}
            </p>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </div>
        <div className="mx-auto w-[800px]">
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={post.title}
            placeholder="Post title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register("title")}
          />
          <div
            onClick={() => {
              editor?.chain().focus().run()
            }}
            className="relative min-h-[500px] outline-none w-full max-w-screen-lg border-muted bg-background p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg"
          >
            {editor && <EditorBubbleMenu editor={editor} />}
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </form>
  )
}
