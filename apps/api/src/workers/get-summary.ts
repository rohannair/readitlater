import { summarizeDocument } from '@/lib/ai'
import { linkRepository } from '@/lib/db/repositories/links.repository'
import { task } from '@trigger.dev/sdk/v3'

export const getSummary = task({
  id: 'get-summary',
  run: async ({ id, document }: { id: string; document: string }) => {
    const summary = await summarizeDocument(document)

    await linkRepository.updateLink({ id, summary })
    return summary
  },
  queue: {
    concurrencyLimit: 3,
  },
})
