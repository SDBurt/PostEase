"use client"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import TextareaAutosize from "react-textarea-autosize"


interface PostFormContentProps {
  form: any
}

export function PostFormContent({ form }: PostFormContentProps) {

  return (
    <>
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Post Content
            </FormLabel>
            <FormControl>
            <TextareaAutosize
                autoFocus
                placeholder="Tweet content"
                className="w-full resize-none appearance-none overflow-hidden bg-transparent text-muted-foreground focus:outline-none"
                {...field}
              />
            </FormControl>

            <FormMessage/>
          </FormItem>
        )}
      />
    </>
  )
}
