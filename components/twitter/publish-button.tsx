'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

interface TwitterPublishButtonProps {
  text: string[]
}
export default function TwitterPublishButton({ text }: TwitterPublishButtonProps) {

  async function testTwitter(e) {
    e.preventDefault()
    const res = await fetch('/api/twitter/publish', {
      method: "POST",
      body: JSON.stringify({
        text: text
      }),
      headers: {
        "content-type": "application/json"
      }
    })

    const data = await res.json()
    
    console.log(data)

    return toast({
      title: "The following data were returned",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      ),
    })

  }

  return (  
    <Button onClick={testTwitter}>Post Twitter</Button>
  )
}