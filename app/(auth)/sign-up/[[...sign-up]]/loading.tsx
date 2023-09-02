import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (

    <div className="container flex h-screen w-screen flex-col items-center justify-center">

      <div className="absolute left-4 top-4 md:left-8 md:top-8">
        <Skeleton className="h-[15px] w-[50px]" />
      </div>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Skeleton className="h-[200px] w-[400px]" />
      </div>
    </div>
  )
}