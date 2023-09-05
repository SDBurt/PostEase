"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { toast } from "@/components/ui/use-toast"

import { Input } from "@/components/ui/input"
import { createPost } from "@/lib/db/actions/post"



const FormSchema = z.object({
  title: z.string()
})

interface PostCreateFormProps {
  scheduledAt?: string
}

export function PostCreateForm({ scheduledAt }: PostCreateFormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: ""
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const newPost = await createPost(data)
      toast({
        title: "Success",
        description: <p>Your post has been updated</p>,
      })
      const destination = `/editor/${newPost.id}` + (scheduledAt ? `?scheduledAt=${scheduledAt}` : "")
      
      router.push(destination)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Your post title" {...field} />
              </FormControl>
              <FormDescription>
                This is the title of your post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
