"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { createPost } from "@/lib/db/actions"
import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface PostCreateButtonProps extends ButtonProps {
  scheduledAt?: string
}

export function PostCreateButton({
  className,
  variant,
  size,
  scheduledAt,
  children,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams()
    params.set(name, value)

    return params.toString()
  }

  async function onClick() {
    setIsLoading(true)

    const post = await createPost({})

    setIsLoading(false)

    const destination = scheduledAt
      ? `/editor/${post.id}` +
        "?" +
        createQueryString("scheduledAt", scheduledAt)
      : `/editor/${post.id}`
    router.push(destination)
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant, size }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      {children}
    </button>
  )
}
