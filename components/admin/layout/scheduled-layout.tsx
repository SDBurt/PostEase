import React from "react"


interface LayoutProps {
  children: React.ReactNode
}

export default function ScheduledLayout({ children }: LayoutProps) {
  return <div >{children}</div>
}
