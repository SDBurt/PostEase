import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid gap-2">
      <div className="flex">
        <Skeleton className="h-[100px] w-5/6" />
      </div>
      <div className="flex">
        <Skeleton className="h-[100px] w-5/6" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-[50px] w-full" />
        <Skeleton className="h-[50px] w-full" />
      </div>
    </div>
  )
}