'use client'

import { EmptyPlaceholder } from '@/components/empty-placeholder'
import { postLinkTabs } from '@/config/admin'
import { Post, Schedule } from '@prisma/client'
import React, { useMemo, useState } from 'react'
import { ScheduleCreateButton } from './create/button'
import ScheduleQueue from './queue'
import LinkTabGroup from '../link-tab-group'
import FieldSelect from '@/components/field-select'

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
      <div className="flex justify-between">
        <LinkTabGroup active="scheduled" tabs={postLinkTabs}/>
        {/* {userSchedules ? <ScheduleEditButton variant="outline" schedule={userSchedules[0]}/> : <ScheduleCreateButton variant="outline" />} */}
        <div className='w-64'>
          <FieldSelect value={selectedSchedule || ""} setValue={setSelectedSchedule} fields={selectFields}/>
        </div>
      </div>
      {
        schedules && schedules.length > 0 && selectedSchedule !== null  ? (
          <ScheduleQueue
            timezone={timezone}
            scheduledPosts={scheduledPosts}
            draftPosts={draftPosts}
            schedules={JSON.parse(schedules.find((schedule) => selectedSchedule === schedule.id)?.schedule as string)}
          />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No schedule created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have a schedule yet. Create one now!
            </EmptyPlaceholder.Description>
            <ScheduleCreateButton variant="outline" />
          </EmptyPlaceholder>
        )
      }
    </div>
  )
}
