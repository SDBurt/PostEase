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
import { createUserSchedule, updateUserSchedule } from "@/lib/db/actions/schedules"



const FormSchema = z.object({
  title: z.string()
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
        : ""
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    

    if (schedule) {
      const updatedSchedule = await updateUserSchedule(schedule.id, data)
      toast({
        title: "Success",
        description: <p>Your schedule has been created!</p>,
      })
      router.push(`/admin/schedule/${updatedSchedule.id}`)
    } else {

      const newSchedule = await createUserSchedule({...data, schedule: ""})
      toast({
        title: "Success",
        description: <p>Your schedule has been updated</p>,
      })
      router.push(`/admin/schedule/${newSchedule.id}`)
    }

    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
