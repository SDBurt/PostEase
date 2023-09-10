import React from "react"

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { TwitterFormText } from "../../twitter-form-text"
import TwitterImages from "../../twitter-images"
import ImageInputButton from "../image/image-input-button"

function TweetFieldActions({ children }) {
  return <div className="flex space-x-2">{children}</div>
}

interface TweetFieldProps {
  form: any
  index: number
  children: React.ReactNode
}

export default function TweetField({ form, index, children }: TweetFieldProps) {
  const { control } = form

  const handleFileSelect = (file: File) => {
    // Handle the selected file here, e.g., upload it to a server
    if (file) {
      console.log("Selected File:", file)

      // Create a data URL for image preview
      const reader = new FileReader()
      reader.onload = () => {
        // setImagePreview(reader.result as string)

        form.setValue(`tweets.${index}.images`, [
          ...(form.getValues(`tweets.${index}.images`) || []),
          {
            preview: reader.result as string,
            file: file,
          },
        ])
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <FormField
        control={control}
        name={`tweets.${index}.text`}
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <TwitterFormText form={form} field={field} index={index} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        }}
      />
      <FormField
        control={control}
        name={`tweets.${index}.images`}
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <TwitterImages control={control} index={index} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        }}
      />
      <TweetFieldActions>
        <ImageInputButton
          onFileSelect={(value: File) => handleFileSelect(value)}
        />
        {children}
      </TweetFieldActions>
    </>
  )
}
