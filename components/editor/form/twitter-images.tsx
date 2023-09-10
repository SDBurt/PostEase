import React from "react"
import { useFieldArray } from "react-hook-form"
import * as z from "zod"

import { editorFormSchema } from "@/lib/validations/editor"
import Icons from "@/components/icons"

import { FormButton } from "./twitter/form-button"
import ImageInputPreview from "./twitter/image/image-preview"

type FormValues = z.infer<typeof editorFormSchema>

function ImageActions({ children }) {
  return <div className="flex flex-row space-x-2">{children}</div>
}

interface TwitterImagesProps {
  control: any
  index: number
}

export default function TwitterImages({ control, index }: TwitterImagesProps) {
  const { fields, remove } = useFieldArray<FormValues>({
    control,
    name: `tweets.${index}.images`,
  })

  return (
    <>
      {fields && fields.length > 0
        ? fields.map((field: any, index: number) => {
            return (
              <ImageInputPreview key={field.id} filePreview={field.preview}>
                <ImageActions>
                  <FormButton
                    onClickHandler={() => remove(index)}
                    content={"Remove Image"}
                    isDestructive
                  >
                    <Icons.close className="h-4 w-4" />
                  </FormButton>
                </ImageActions>
              </ImageInputPreview>
            )
          })
        : null}
    </>
  )
}
