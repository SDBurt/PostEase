import React from 'react'
import { Select, SelectItem } from '@/components/ui/select'

import { TIMEZONES } from '@/lib/constants'

export default function TimezoneSelect() {
  return (
    <Select>
        <SelectTrigger className='w-48'>
          <SelectValue placeholder="Pick a timezone" />
        </SelectTrigger>
        <SelectContent>
          {/* TODO: Make overflow a 'scroll area' */}
          <div className='max-h-48 overflow-y-scroll rounded'>
          {TIMEZONES.map(tz => {
            return (
              <SelectItem key={tz} value={tz} onClick={() => console.log(tz)}>{tz}</SelectItem>
            )
          })}
          </div>
        </SelectContent>
      </Select>
  )
}
