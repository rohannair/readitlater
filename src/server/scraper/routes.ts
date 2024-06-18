import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { verifySession } from '@/server/_middleware/verifySession'
import { queueScrape } from '@/server/scraper/queueScrape'

const urlSchema = z.object({
  url: z.string().url(),
})

export const apiRouter = new Hono()
  // .use(verifySession)
  .get('/url', zValidator('query', urlSchema), async (c) => {
    console.log('HIT HERE')
    const { url } = c.req.valid('query')
    const { id, markdown } = await queueScrape({ url })
    return c.json({ message: 'Scraping started', id: id, markdown })
  })
