
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

interface FieldSelectProps {
  value: string
  setValue: any
  fields: {label: string, name: string}[]
}

export default function FieldSelect({ value, setValue, fields}: FieldSelectProps) {

  return (
    <Select onValueChange={setValue} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder="Select a schedule" />
      </SelectTrigger>
      <SelectContent>
        {
          fields?.map((field, index) => (
            <SelectItem key={`${field.name}-${index}`} value={field.name}>{field.label}</SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  )
}
