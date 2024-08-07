'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY as string
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST as string

if (typeof window !== 'undefined') {
  posthog.init(KEY, {
    api_host: HOST,
    person_profiles: 'identified_only',
  })
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
