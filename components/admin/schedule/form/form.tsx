"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { TIME_OPTIONS } from "@/lib/constants"
import { Checkbox } from "@/components/ui/checkbox"
import Icons from "@/components/icons"


const items = [
  {
    id: 0,
    label: "Mon",
  },
  {
    id: 1,
    label: "Tue",
  },
  {
    id: 2,
    label: "Wed",
  },
  {
    id: 3,
    label: "Thu",
  },
  {
    id: 4,
    label: "Fri",
  },
  {
    id: 5,
    label: "Sat",
  },
  {
    id: 6,
    label: "Sun",
  },
] as const

const FormSchema = z.object({
  schedules: z.array(
    z.object({
      time: z.string({
        required_error: "Please select an time.",
      }),
      days: z.array(z.number()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one day.",
      }),
    })
  )
})


export function ScheduleForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      schedules: [
        {time: "0-0", days: []},
        {time: "0-30", days: [2]}
      ]
      
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: "schedules",
    control: form.control,
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    
    
    // const payload = {
    //   h: data.time.split("-")[0],
    //   m: data.time.split("-")[1],
    //   days: data.days
    // }

    console.log({data})

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        {/* Head */}
        <div className="w-full grid grid-cols-12 gap-4">
          <FormLabel className="text-center col-span-2">
            Time
          </FormLabel>
          {items.map((item) => (
            <FormLabel key={`column-${item.id}-${item.label}`} className="text-center">
              {item.label}
            </FormLabel>
          ))}
        </div>

        {/* Body */}
        <div className="w-full grid gap-4 mt-4 ">
          {
            fields.map((field, index) => (
              <div key={`${field.id}`} className="grid grid-cols-12 gap-4">
                <FormField
                  control={form.control}
                  key={`${field.id}-time`}
                  name={`schedules.${index}.time`}
                  render={({ field }) => (        
                    <FormItem className="col-span-2">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <div className='max-h-48 overflow-y-scroll rounded'>
                          {TIME_OPTIONS.map((option) => {
                            return (
                              <SelectItem key={`${option.value.h}-${option.value.m}`} value={`${option.value.h}-${option.value.m}`}>{option.label}</SelectItem>
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
                      {
                        items.map(item => (
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
                        ))
                        
                      }
                      
                    </>
                  )}
                />
                <div className="flex flex-col items-center justify-center">
                <Button
                  className="hover:bg-destructive hover:text-destructive-foreground hover:shadow-sm w-6"
                  type="button"
                  variant="secondary"
                  size="xs"
                  onClick={() => remove(index)}
                >
                  <Icons.close className="h-4 w-4" />
                </Button>
                </div>
              </div>
              
              )
              
            )
            
          }
          
        </div>
        <div className="w-full grid gap-4 mt-4 justify-center">
          <Button type="button" className="w-48" variant="secondary" onClick={() => append({time: "0-0", days: []})}>New Row</Button>
        </div>
        <Button className="mt-4" type="submit">Submit</Button>
      </form>
    </Form>
  )
}
