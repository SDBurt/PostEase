"use client"

import { useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ScheduleFormItem, ScheduleType } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Schedule } from "@prisma/client"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { TIME_OPTIONS } from "@/lib/constants"
import { createUserSchedule, getDefaultSchedule, getUserSchedule, updateUserSchedule } from "@/lib/db/actions/schedules"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
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
import { toast } from "@/components/ui/use-toast"
import Icons from "@/components/icons"
import { Input } from "@/components/ui/input"

const items = [
  {
    id: 0,
    label: "Sun",
  },
  {
    id: 1,
    label: "Mon",
  },
  {
    id: 2,
    label: "Tue",
  },
  {
    id: 3,
    label: "Wed",
  },
  {
    id: 4,
    label: "Thu",
  },
  {
    id: 5,
    label: "Fri",
  },
  {
    id: 6,
    label: "Sat",
  },
] as const

const FormSchema = z.object({
  title: z.string(),
  isDefault: z.boolean().default(true).optional(),
  schedules: z
    .array(
      z.object({
        time: z.string({
          required_error: "Please select an time.",
        }),
        days: z
          .array(z.number())
          .refine((value) => value.some((item) => item), {
            message: "You have to select at least one day.",
          }),
      })
    )
    .refine(
      (items) => new Set(items.map((item) => item.time)).size === items.length,
      {
        message: "Must be an array of unique times",
      }
    ),
})

const scheduleToFormItem = (schedules: ScheduleType[]): ScheduleFormItem[] => {
  return schedules?.map((schedule) => ({
    time: `${schedule.h}-${schedule.m}`,
    days: schedule.days,
  }))
}

const formItemToSchedule = (formData: ScheduleFormItem[]): ScheduleType[] => {
  return formData.map((item) => ({
    h: parseInt(item.time.split("-")[0]),
    m: parseInt(item.time.split("-")[1]),
    days: item.days,
  }))
}

interface ScheduleFormProps {
  schedule: Schedule
}

export function ScheduleForm({ schedule }: ScheduleFormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: schedule.title,
      isDefault: schedule.isDefault || false,
      schedules: schedule
        ? scheduleToFormItem(JSON.parse(schedule.schedule as string))
        : [
            { time: "0-0", days: [0, 6] },
            { time: "0-30", days: [2] },
          ],
    },
  })

  const { fields, append, remove, replace } = useFieldArray({
    name: "schedules",
    control: form.control,
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const scheduleData = formItemToSchedule(
      data.schedules as ScheduleFormItem[]
    )

    const payload = {
      title: data.title,
      isDefault: data.isDefault,
      schedule: JSON.stringify(scheduleData)
    }

    if (data.isDefault) {
      const defaultSchedules = await getDefaultSchedule()
      if (defaultSchedules) {
        for (const schedule of defaultSchedules) {
          await updateUserSchedule(schedule.id, { isDefault: false })
        }
      }
    }

    if (schedule) {
      await updateUserSchedule(schedule.id, payload)
      toast({
        title: "Success",
        description: (<p>Your schedule has been updated.</p>),
      })
    } else {
      await createUserSchedule(payload)
      toast({
        title: "Success",
        description: (<p>Your schedule has been created.</p>),
      })
    }

    router.refresh()
  }

  const watchFieldArray = form.watch("schedules")

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    }
  })

  const compareControlledFields = useCallback((a, b) => {
    if (a.time < b.time) {
      return -1
    }
    if (a.time > b.time) {
      return 1
    }
    return 0
  }, [])

  function fieldsEqual(a: ScheduleFormItem[], b: ScheduleFormItem[]) {
    return (
      (Array.isArray(a) || Array.isArray(b)) &&
      a.length === b.length &&
      a.every((val, index) => val.id === b[index].id)
    )
  }

  useEffect(() => {
    const sortedFields = [...controlledFields]
    sortedFields.sort(compareControlledFields)

    if (
      !fieldsEqual(
        sortedFields as ScheduleFormItem[],
        controlledFields as ScheduleFormItem[]
      )
    ) {
      replace(sortedFields)
    }
  }, [replace, controlledFields, compareControlledFields])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col space-y-8 p-2">

      <FormField
          control={form.control}
          name="isDefault"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Select this schedule as your default
                </FormLabel>
                <FormDescription>
                  Your default schedule will be used when quickly selecting the next available slot.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="weekday schedule" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormLabel>Schedule</FormLabel>
        <div>
          {/* Head */}
          <div className="grid w-full grid-cols-10 gap-4">
            <FormLabel className="col-span-2 text-center">Time</FormLabel>
            {items.map((item) => (
              <FormLabel
                key={`column-${item.id}-${item.label}`}
                className="text-center"
              >
                {item.label}
              </FormLabel>
            ))}
          </div>

          {/* Body */}
          <div className="mt-4 grid w-full gap-4 ">
            {fields.map((field, index) => (
              <div key={`${field.id}`} className="grid grid-cols-10 gap-4">
                <FormField
                  control={form.control}
                  key={`${field.id}-time`}
                  name={`schedules.${index}.time`}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <div className="max-h-48 overflow-y-scroll rounded">
                            {TIME_OPTIONS.map((option) => {
                              return (
                                <SelectItem
                                  key={`${option.value.h}-${option.value.m}`}
                                  value={`${option.value.h}-${option.value.m}`}
                                >
                                  {option.label}
                                </SelectItem>
                              )
                            })}
                          </div>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  key={`${field.id}-days`}
                  name={`schedules.${index}.days`}
                  render={({ field }) => (
                    <>
                      {items.map((item) => (
                        <FormItem
                          key={`${index}-${item.id}`}
                          className="flex flex-col items-center justify-center"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      ))}
                    </>
                  )}
                />
                <div className="flex flex-col items-center justify-center">
                  <Button
                    className="w-6 hover:bg-destructive hover:text-destructive-foreground hover:shadow-sm"
                    type="button"
                    variant="secondary"
                    size="xs"
                    onClick={() => remove(index)}
                  >
                    <Icons.close className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 grid w-full justify-center gap-4">
          <Button
            type="button"
            className="w-48"
            variant="secondary"
            onClick={() => append({ time: "8-0", days: [1, 2, 3, 4, 5] })}
          >
            New Row
          </Button>
        </div>
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
