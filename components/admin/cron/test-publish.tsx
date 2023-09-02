

"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { publishScheduledPosts } from "@/lib/actions"

export default function PublishButton() {
  
  async function testPublish(e) {
    e.preventDefault()
    const data = await publishScheduledPosts()

    return toast({
      title: "The following data was returned",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return <Button onClick={testPublish}>Cron Publish</Button>
}
