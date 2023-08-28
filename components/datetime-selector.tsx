import React, { useCallback, useMemo, useState } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "./ui/button"

function makeDateTimeSelect(): {
  label: string
  value: string
  hour: number
  minute: number
}[] {
  const ampm = ["AM", "PM"]
  const hours = [
    "12",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
  ]
  const minutes = ["00", "15", "30", "45"]

  const result: {
    label: string
    value: string
    hour: number
    minute: number
  }[] = []

  ampm.forEach((ap) => {
    hours.forEach((hour) => {
      minutes.forEach((minute) => {
        result.push({
          label: `${hour}:${minute} ${ap}`,
          value: `${hour}${minute}${ap}`,
          hour: parseInt(hour),
          minute: parseInt(minute),
        })
      })
    })
  })

  return result
}

export default function DatetimeSelector() {
  const options = useMemo(() => makeDateTimeSelect(), [])

  return (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Pick a time" />
      </SelectTrigger>
      <SelectContent>
        {/* TODO: Make overflow a 'scroll area' */}
        <div className="max-h-48 overflow-y-scroll rounded">
          {options.map((option) => {
            return (
              <SelectItem
                key={option.value}
                value={option.value}
                onClick={() => console.log(option)}
              >
                {option.label}
              </SelectItem>
            )
          })}
        </div>
      </SelectContent>
    </Select>
  )
}
