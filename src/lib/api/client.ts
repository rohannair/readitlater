import type { AppType } from '@/lib/server'
import { hc } from 'hono/client'

export const client = hc<AppType>('/')
