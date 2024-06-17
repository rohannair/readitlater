import { handle } from 'hono/vercel'
import { app } from '@/lib/server'

// export const runtime = 'edge'

export const OPTIONS = handle(app)
export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)
