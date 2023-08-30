import { UserAccountNav } from '@/components/auth/user-account-nav'
import { ModeToggle } from '@/components/mode-toggle'
import React from 'react'

export default function MobileHeader({user}) {
  return (
    <header className="bg-background container w-full">
      <div className="py-2 md:py-4 flex justify-between items-center">
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
