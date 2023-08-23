"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  
  const [isTwitterLoading, setisTwitterLoading] = React.useState<boolean>(false)
  const [isLinkedinLoading, setIsLinkedinLoading] = React.useState<boolean>(false)

  return (
    <div className={cn("grid gap-4", className)} {...props}>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setisTwitterLoading(true)
          signIn("twitter")
        }}
        disabled={isLinkedinLoading || isTwitterLoading}
      >
        {isTwitterLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.twitter className="mr-2 h-4 w-4" />
        )}{" "}
        Twitter
      </button>
      {/* <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsLinkedinLoading(true)
          signIn("linkedin")
        }}
        disabled={isLinkedinLoading || isTwitterLoading}
      >
        {isLinkedinLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.linkedin className="mr-2 h-4 w-4" />
        )}{" "}
        Linkedin
      </button> */}
    </div>
  )
}