import { hc } from 'hono/client'
import type { AppType } from '@/lib/server'

export const client = hc<AppType>('/')
