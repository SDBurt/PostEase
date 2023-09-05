import { UserAccountNav } from '@/components/auth/user-account-nav'
import { ModeToggle } from '@/components/mode-toggle'
import React from 'react'

export default function SidebarHeader({user}) {
  return (
    <header className="bg-background">
      <div className="flex items-center justify-between py-4">
        <UserAccountNav
          user={{
            name: user.name,
            image: user.image,
            email: user.email,
          }}
        />
        <ModeToggle />
      </div>
    </header>
  )
}
