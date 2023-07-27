"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { insertPostSchema } from "@/lib/db/validation"
import { Post } from "@/lib/db/supabase"

// import { updatePost } from "@/lib/db/actions"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

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


  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World! 🌎️</p>',
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
              {post.status === 'published' ? "Published" : "Draft"}
            </p>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </div>
        <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
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
              editor?.chain().focus().run();
            }}
            className="relative min-h-[500px] outline-none w-full max-w-screen-lg border-muted bg-background p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg"
          >
            <EditorContent editor={editor} />
          </div>
          
          {/* <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p> */}
        </div>
      </div>
    </form>
  )
}