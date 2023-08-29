'use client'

import React, { useMemo } from 'react'

import LinkTabGroup, { LinkTabType } from '../link-tab-group'
import { useSelectedLayoutSegments } from 'next/navigation'

interface PostTabsProps extends React.HTMLAttributes<HTMLDivElement>{
  tabs: LinkTabType[]
}

export default function PostTabs({tabs}: PostTabsProps) {

  const segment = useSelectedLayoutSegments()
  
  const active = useMemo(() => segment[0], [segment])

  return (
    <LinkTabGroup active={active} tabs={tabs} />
  )
}
