'use client'

import { postLinkTabs } from '@/config/admin'
import { Post, Schedule } from '@prisma/client'
import React, { Suspense, useMemo, useState } from 'react'
import { ScheduleCreateButton } from './create/button'
import ScheduleQueue from './queue'
import LinkTabGroup from '../link-tab-group'
import FieldSelect from '@/components/field-select'
import EmptyListPlaceholder from '../empty-placeholder'
import { Skeleton } from '@/components/ui/skeleton'

interface ScheduleContainer {
  schedules: Schedule[] | null
  timezone: string
  draftPosts: Post[]
  scheduledPosts: Post[]
}

export default function ScheduleContainer({ schedules, timezone, draftPosts, scheduledPosts }: ScheduleContainer) {

  const [selectedSchedule, setSelectedSchedule] = useState(schedules?.find(schedule => schedule.isDefault)?.id || null)

  const selectFields = useMemo(() => schedules?.map(schedule => ({
    label: schedule.title, name: schedule.id})) || [], [schedules])

  return (
    <div className='px-1'>
      <div className="flex md:justify-between space-x-2">
        <LinkTabGroup active="scheduled" tabs={postLinkTabs}/>
        <div className="fixed bottom-20 right-8 md:relative md:right-auto md:bottom-auto">
          <FieldSelect value={selectedSchedule || ""} setValue={setSelectedSchedule} fields={selectFields}/>
        </div>
      </div>
      <Suspense fallback={<Skeleton className="h-5 w-2/5" />}>
        {
          schedules && schedules.length > 0 && selectedSchedule !== null  ? (
            <ScheduleQueue
              timezone={timezone}
              scheduledPosts={scheduledPosts}
              draftPosts={draftPosts}
              schedules={JSON.parse(schedules.find((schedule) => selectedSchedule === schedule.id)?.schedule as string)}
            />
          ) : (
          <EmptyListPlaceholder
            title="No schedule created"
            description="You don't have a schedule yet. Create one now!"
            iconName="post"
          >
            <ScheduleCreateButton variant="outline" />
          </EmptyListPlaceholder>
          )
        }
      </Suspense>
    </div>
  )
}
