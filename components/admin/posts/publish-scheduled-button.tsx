"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { publishForUser } from "@/lib/actions"

export default function PublishScheduledButton() {
  
  async function testPublish(e) {
    e.preventDefault()
    const data = await publishForUser()

    return toast({
      title: "The following data was returned",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return <Button onClick={testPublish}>Publish Scheduled</Button>
}
