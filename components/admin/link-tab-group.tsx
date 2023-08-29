
import React from 'react'

import { buttonVariants } from '../ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export type LinkTabType = {
  label: string
  name: string
  href: string
}

interface LinkTabGroupProps extends React.HTMLAttributes<HTMLDivElement>{
  active: string
  tabs: LinkTabType[]
}

export default function LinkTabGroup({active, tabs}: LinkTabGroupProps) {

  return (
    <div className='space-x-1 pb-4'>
      {
        tabs.map((tab: LinkTabType) => {
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(active === tab.name ? buttonVariants({variant: "secondary"}) : buttonVariants({variant: "ghost"}))}
            >
              {tab.label}
            </Link>
          )
        })
      }
    </div>
  )
}
