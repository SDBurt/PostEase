"use client"

import React, { useState } from "react"
import { Schedule } from "@prisma/client"

import dayjs from "@/lib/dayjs"
import { getSlotData } from "@/lib/schedule"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import EmptyListPlaceholder from "@/components/admin/empty-placeholder"
import { ScheduleCreateButton } from "@/components/admin/schedule/create/button"

function SelectAllOptions({ schedule }) {
  if (!schedule) {
    return <p className="px-3 py-2 text-sm">No Slot</p>
  }

  const slots = getSlotData(schedule)

  const options = slots.reduce(
    (acc, curr) => [...acc, ...curr.items.map((item) => item.date)],
    [] as string[]
  )

  return (
    <>
      {options && options.length > 0 ? (
        options.map((slot) => {
          return (
            <SelectItem key={slot} value={slot}>
              {dayjs(slot).format("ddd, MMM D, YYYY - h:mm A")}
            </SelectItem>
          )
        })
      ) : (
        <p className="px-3 py-2 text-sm">No Slot for this date</p>
      )}
    </>
  )
}

// function SelectOptions({scheduledAtDate, scheduleByDayOfWeek}) {

//   if (!scheduledAtDate) {
//     return null
//   }

//   const now = dayjs()
//   const scheduledAt = dayjs(scheduledAtDate)
//   const currentDate = scheduledAt.date()

//   const options = scheduleByDayOfWeek[currentDate]

//   const filterdOptions = options.filter(option => {
//     return scheduledAt.hour(option.h).minute(option.m) > now
//   })

//   return (
//     <>
//       {
//           filterdOptions && filterdOptions.length > 0 ? filterdOptions.map((slot, index) => {
//             const dt = dayjs(scheduledAtDate).hour(slot.h).minute(slot.m)
//             return (
//               <SelectItem
//                 key={`${slot.h}-${slot.m}-${index}`}
//                 value={dt.format()}
//               >
//                 {dt.format("ddd, MMM D, YYYY - h:mm A")}
//               </SelectItem>
//             )
//         }) : <div>No Slot for this date</div>
//       }
//     </>
//   )
// }

interface ScheduleFormProps {
  form: any
  schedules: Pick<
    Schedule,
    "id" | "title" | "schedule" | "isDefault" | "timezone"
  >[]
}

export function ScheduleContent({ form, schedules }: ScheduleFormProps) {
  const [selectedSchedule, setSelectedSchedule] = useState(
    schedules?.find((schedule) => schedule.isDefault)
  )

  // const scheduledAtDate = form.watch("scheduledAtDate") // you can also target specific fields by their names
  const schedulePost = form.watch("schedulePost") // you can also target specific fields by their names
  // const byDayOfWeek = toDayOfWeek(schedule)

  const onSelectChangeHandler = (value: Schedule["id"]) => {
    const selected = schedules?.find((item) => {
      return item.id === value
    })

    if (selected) {
      setSelectedSchedule(selected)
    }
  }

  return (
    <>
      <FormField
        control={form.control}
        name="schedulePost"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Schedule Post</FormLabel>
              <FormDescription>Schedule this post?</FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
      {schedulePost && schedules && schedules.length === 0 ? (
        <EmptyListPlaceholder
          title="No Schedules"
          description="Create a schedule to start posting"
          iconName="scheduled"
        >
          <ScheduleCreateButton />
        </EmptyListPlaceholder>
      ) : null}
      {schedulePost && schedules && schedules.length > 0 ? (
        <>
          <Select
            onValueChange={onSelectChangeHandler}
            defaultValue={selectedSchedule?.id}
          >
            <FormControl>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select a date to view slots" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {schedules?.map((schedule) => (
                <SelectItem key={schedule.id} value={schedule.id}>
                  {schedule.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormField
            control={form.control}
            name="scheduledAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slot</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select a date to view slots" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectAllOptions
                      schedule={JSON.parse(
                        (selectedSchedule?.schedule as string) || "[]"
                      )}
                    />
                  </SelectContent>
                </Select>
                <FormDescription>
                  The time slots available for the upcoming week
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      ) : null}

      {/* TODO: ADVANCED */}
      {/* <FormField
        control={form.control}
        name="scheduledAtDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
              <FormLabel>Schedule Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < dayjs().subtract(1, "day").toDate()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                The Date you want to publish this post at
              </FormDescription>
              <FormMessage />
            </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="scheduledAt"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Slot</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-background" disabled={!scheduledAtDate}>
                  <SelectValue placeholder="Select a date to view slots" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectOptions scheduledAtDate={scheduledAtDate} scheduleByDayOfWeek={byDayOfWeek} />
              </SelectContent>
            </Select>
            <FormDescription>
              The time slots available for the selected date
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />*/}
    </>
  )
}
