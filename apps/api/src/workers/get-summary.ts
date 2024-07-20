import { summarizeDocument } from '@/lib/ai'
import { client, db } from '@/lib/db'
import { createLinkRepository } from '@/lib/db/repositories/links.repository'
import { task } from '@trigger.dev/sdk/v3'

export const getSummary = task({
  id: 'get-summary',
  run: async ({ id, document }: { id: string; document: string }) => {
    const summary = await summarizeDocument(document)

    await client.connect()
    await createLinkRepository(db).updateLink({ id, summary })
    return summary
  },
  queue: {
    concurrencyLimit: 3,
  },
})
