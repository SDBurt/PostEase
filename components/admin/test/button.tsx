"use client"

import { Button } from "@/components/ui/button"
import TwitterWhoAmIButton from "@/components/twitter/whoami-button"

export default function TestButtons() {
  async function testCron(e) {
    e.preventDefault()
    const res = await fetch("/api/cron/publish")
  }

  async function testPublish(e) {
    e.preventDefault()
    const res = await fetch("/api/twitter/publish", {
      method: "POST",
      body: JSON.stringify({
        text: ["Test"],
      }),
    })
  }

  return (
    <div className="flex space-x-2">
      <TwitterWhoAmIButton />
      {
        process.env.NODE_ENV === "development" ? (
          <>
            <Button variant="secondary" onClick={testCron}>
              Test Cron API
            </Button>
            <Button variant="destructive" onClick={testPublish}>
              Test Publish API
            </Button>
          </>
        ) : null
      }
    </div>
  )
}
