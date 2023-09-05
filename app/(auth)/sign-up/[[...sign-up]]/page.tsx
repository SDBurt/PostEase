
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Icons from "@/components/icons"
import ThemedSignUp from "@/components/themed-sign-up"

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
}

export default function SignUpPage() {

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Home
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <ThemedSignUp />
      </div>
    </div>
  )
}
