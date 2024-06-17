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

type Env = {
  Variables: {
    session: string
  }
}
export const app = new Hono<Env>()
// for RPC
export type AppType = typeof app

app.use(logger())

const apiRouter = new Hono()
apiRouter.use(verifySession)
apiRouter.post('/url', zValidator('json', urlSchema), async (c) => {
  const { url } = c.req.valid('json')
  const { id } = await queueScrape({ url })
  return c.json({ message: 'Scraping started', id: id })
})

app
  .get('/', (c) => c.text('Hello World!'))
  .get('/health', (c) =>
    c.json({ message: 'Healthy', uptime: process.uptime() }),
  )
  .route('/auth', authRouter)
  .route('/api', apiRouter)
