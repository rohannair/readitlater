import { linkRepository } from '@/lib/db/repositories/links.repository'
import { verifySession } from '@/server/_middleware/verifySession'
import { queueScrape } from '@/server/scraper/queueScrape'
import type { Env } from '@/types/common'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

const urlSchema = z.object({
  url: z.string().url(),
})

export const apiRouter = new Hono<Env>()
  .use(verifySession)
  .get('/url', zValidator('query', urlSchema), async (c) => {
    const { url } = c.req.valid('query')
    const userId = c.var.user.id

    const link = await linkRepository.createLink({
      url,
      userId,
    })

    if (!link?.id) {
      return c.json({ message: 'Link already exists' }, 400)
    }

    const { message } = await queueScrape({ url, link: link.id })
    return c.json({ message })
  })
  .get('/url/status', async (c) => {
    return c.json({ message: 'Status' })
  })
