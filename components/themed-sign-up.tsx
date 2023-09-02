'use client'

import { SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import React from 'react'

export default function ThemedSignUp() {
  const { resolvedTheme } = useTheme()
  return (
    <SignUp
        appearance={{
          baseTheme: resolvedTheme === 'dark' ? dark : undefined,
        }}
      />
  )
}
