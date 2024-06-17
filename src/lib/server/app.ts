import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { z } from 'zod'
import { verifySession } from './_middleware/verifySession'
import { queueScrape } from './scraper/queueScrape'
import { authRouter } from './auth'

const urlSchema = z.object({
  url: z.string().url(),
})

const apiRouter = new Hono()
  .use(verifySession)
  .post('/url', zValidator('json', urlSchema), async (c) => {
    const { url } = c.req.valid('json')
    const { id } = await queueScrape({ url })
    return c.json({ message: 'Scraping started', id: id })
  })

type Env = {
  Variables: {
    session: string
  }
}
export const app = new Hono<Env>()
  .basePath('/api')
  .use(logger())
  .get('/', (c) => c.text('Hello World!'))
  .get('/health', (c) =>
    c.json({ message: 'Healthy', uptime: process.uptime() }),
  )
  .route('/auth', authRouter)
  .route('/v1', apiRouter)

// for RPC
export type AppType = typeof app
