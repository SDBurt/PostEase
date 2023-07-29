'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { dayDate, dayFormat, dayFormatTime, dayMonth, dayOfWeek, dayRange, dayYear } from '@/lib/utils'
import React, { useState } from 'react'



const exampleSchedule = [
  {h: 2, m: 0, days: [0, 1, 2]},
  {h: 7, m: 15, days: [1, 2]},
  {h: 9, m: 0, days: [0, 1]},
  {h: 12, m: 30, days: [1]},
  {h: 17, m: 0, days: [2]},
]

type Schedule = {h: number, m: number, days: number[]}

interface Slot {
  h: number, m: number, date: string
}

interface SectionData {
  date: string,
  items: Slot[]
}

function getQueueData(schedule: Schedule[]): SectionData[] {

  const range = dayRange(new Date())

  let byDayOfWeek: {[key: string]: {h: number, m: number}[]} = {}

  // {h: 2, m: 0, days: [0, 1, 2]},
  schedule.forEach((item: Schedule) => {
    item.days.forEach((dow: number) => {
      if (Object.keys(byDayOfWeek).includes(dow.toString())) {
        byDayOfWeek[dow] = [...byDayOfWeek[dow], {h: item.h, m: item.m}]
      }
      else {
        byDayOfWeek[dow] = [{h: item.h, m: item.m}]
      }
      
    })
    
  })

  let data: SectionData[] = []
  range.forEach(dt => {
    const dow = dayOfWeek(dt)
    const year = String(dayYear(dt)).padStart(2, '0')
    const month = String(dayMonth(dt) + 1).padStart(2, '0')
    const day = String(dayDate(dt)).padStart(2, '0')

    const items = (byDayOfWeek[dow] || []).map(item => ({
      h: item.h,
      m: item.m,
      date: `${year}-${month}-${day} ${String(item.h).padStart(2, '0')}:${String(item.m).padStart(2, '0')}:00`
    }))
    
    // 2023-07-29T18:42:55-07:00
    let newDataItem: SectionData = {
      date: dt,
      items: items
    }

    data.push(newDataItem)
  })

  return data
}

function ScheduleQueueItem({ datetime }) {
  return (
    <Card>
      <CardContent className='px-4 flex justify-between group'>
        <div className='flex items-center justify-start'>
          {dayFormatTime(datetime)}
        </div>
        <div className='hidden group-hover:flex items-center justify-end space-x-2'>
          <Button variant='outline' size='sm'>New</Button>
          <Button variant='outline' size='sm'>Choose</Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface ScheduleQueueSectionProps {
  sectionData: {
    date: string | Date,
    items: {date: string, h: number, m: number}[]
  }
}

function ScheduleQueueSection({ sectionData }: ScheduleQueueSectionProps) {
  return (
    <div className='flex flex-col space-y-4'>
      <Label>{dayFormat(sectionData.date)}</Label>
      {
        sectionData.items.map((item) => (
          <div key={`${sectionData.date}-slot-${item.h}-${item.m}`}>
            <ScheduleQueueItem datetime={item.date}/>
          </div>
        ))
      }
    </div>
  )
}



export default function ScheduleQueue() {

  const [data, setData] = useState<SectionData[]>(getQueueData(exampleSchedule))

  console.log({data})

  return (
    <div className="flex flex-col space-y-2">
      {
        data?.map(item => (
          
          <div key={`${item.date}-section`}>
            <ScheduleQueueSection sectionData={item}/>
          </div>
        ))
      }
      
    </div>
  )
}
