"use client"

import { useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Schedule } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { toast } from "@/components/ui/use-toast"

import { Input } from "@/components/ui/input"
import { createSchedule, updateSchedule } from "@/lib/db/actions/schedules"
import { Checkbox } from "@/components/ui/checkbox"



const FormSchema = z.object({
  title: z.string(),
  isDefault: z.boolean().default(false)
})

interface ScheduleFormProps {
  schedule?: Schedule
}

export function ScheduleForm({ schedule }: ScheduleFormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: schedule
        ? schedule.title
        : "",
      isDefault: true
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    

    if (schedule) {
      const updatedSchedule = await updateSchedule(schedule.id, data)
      toast({
        title: "Success",
        description: <p>Your schedule has been created!</p>,
      })
      router.push(`/admin/schedule/${updatedSchedule.id}`)
    } else {

      const newSchedule = await createSchedule({...data, schedule: ""})
      toast({
        title: "Success",
        description: <p>Your schedule has been updated</p>,
      })
      router.push(`/admin/schedule/${newSchedule.id}`)
    }

    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="weekday schedule" {...field} />
              </FormControl>
              <FormDescription>
                This is the title of your schedule.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <div className="space-y-2 leading-none">
                <FormLabel>
                  Default Schedule
                </FormLabel>
                <FormDescription>
                  Your default schedule will be used when quickly selecting the next available slot.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
