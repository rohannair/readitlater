import { summarizeDocument } from '@/lib/ai'
import { client, db } from '@/lib/db'
import { createLinkRepository } from '@/lib/db/repositories/links.repository'
import { task } from '@trigger.dev/sdk/v3'

export const getSummary = task({
  id: 'get-summary',
  run: async ({ id, document }: { id: string; document: string }) => {
    try {
      const summary = await summarizeDocument(document)

      await createLinkRepository(db).updateLink({
        id,
        summary,
        status: 'completed',
      })
      return summary
    } catch (error) {
      await createLinkRepository(db).updateLink({
        id,
        status: 'error',
      })
      throw error
    }
  },
  queue: {
    concurrencyLimit: 3,
  },
})
