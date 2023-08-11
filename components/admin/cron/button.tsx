'use client'

import { Button } from '@/components/ui/button'


export default function CronTestButton() {

  async function testCron(e) {
    e.preventDefault()
    await fetch('/api/cron/publish')
  }

  return (  

    <Button onClick={testCron}>Test Cron</Button>
    
  )
}
