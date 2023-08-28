import React from "react"

import { TIMEZONES } from "@/lib/constants"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function TimezoneSelect() {
  return (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Pick a timezone" />
      </SelectTrigger>
      <SelectContent>
        {/* TODO: Make overflow a 'scroll area' */}
        <div className="max-h-48 overflow-y-scroll rounded">
          {TIMEZONES.map((tz) => {
            return (
              <SelectItem key={tz} value={tz} onClick={() => console.log(tz)}>
                {tz}
              </SelectItem>
            )
          })}
        </div>
      </SelectContent>
    </Select>
  )
}
