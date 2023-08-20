'use client'

import { Button } from '@/components/ui/button'


export default function TweetTestButton() {

  async function testTweet(e) {
    e.preventDefault()
    await fetch('/api/twitter/tweet')
  }

  return (  

    <Button onClick={testTweet}>Test Tweet</Button>
    
  )
}
