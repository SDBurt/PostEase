"use client"

import { Button } from "@/components/ui/button"
import TwitterWhoAmIButton from "@/components/twitter/whoami-button"

export default function TestButtons() {
  async function testCron(e) {
    e.preventDefault()
    const res = await fetch("/api/cron/publish")
    console.log(await res.json())
  }

  async function testPublish(e) {
    e.preventDefault()
    const res = await fetch("/api/twitter/publish", {
      method: "POST",
      body: JSON.stringify({
        text: ["Test"],
      }),
    })
    console.log(await res.json())
  }

  return (
    <div className="flex space-x-2">
      <TwitterWhoAmIButton />
      <Button variant="secondary" onClick={testCron}>
        Test Cron API
      </Button>
      <Button variant="destructive" onClick={testPublish}>
        Test Publish API
      </Button>
    </div>
  )
}
