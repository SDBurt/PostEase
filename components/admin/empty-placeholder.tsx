import React from 'react'
import { EmptyPlaceholder } from '../empty-placeholder'
import Icons from '../icons'

interface EmptyListPlaceholderProps {
  title: string
  description: string
  children: React.ReactNode
  iconName: keyof typeof Icons
}

export default function EmptyListPlaceholder({
  title,
  description,
  children,
  iconName = "post"
}: EmptyListPlaceholderProps) {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name={iconName} />
      <EmptyPlaceholder.Title>{title}</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        {description}
      </EmptyPlaceholder.Description>
      {children}
    </EmptyPlaceholder>
  )
}
