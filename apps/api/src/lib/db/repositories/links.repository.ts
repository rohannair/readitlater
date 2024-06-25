import { db } from '@/lib/db/client'
import { type Link, links, linksUsers, users } from '@/lib/db/schema'
import { createId } from '@paralleldrive/cuid2'
import { and, eq } from 'drizzle-orm'

interface LinkRepository {
  createLink(input: { url: string; userId: string }): Promise<Partial<Link>>
  updateLink(params: {
    id: string
    body: string
    title: string
    summary: string
  }): Promise<void>
  getAllForUser(userId: string): Promise<Partial<Link>[] | undefined[]>
  getById(params: { linkId: string; userId: string }): Promise<
    Partial<Link> | undefined
  >
}

const createLinkRepository = (): LinkRepository => ({
  async createLink({ url, userId }) {
    if (!url) {
      throw new Error('URL is required')
    }

    return await db.transaction(async (tx) => {
      const [link] = await tx
        .insert(links)
        .values({
          id: createId(),
          url: url,
        })
        .returning({
          id: links.id,
          url: links.url,
        })

      await tx.insert(linksUsers).values({
        linkId: link.id,
        userId: userId,
      })

      return link
    })
  },

  async updateLink({ id, body, title, summary }) {
    await db
      .update(links)
      .set({
        cleaned: body,
        title: title,
        summary: summary,
      })
      .where(eq(links.id, id))
  },

  async getAllForUser(userId) {
    return await db
      .select({
        id: links.id,
        url: links.url ?? '',
        title: links.title ?? '',
        createdAt: links.createdAt,
      })
      .from(links)
      .innerJoin(linksUsers, eq(links.id, linksUsers.linkId))
      .innerJoin(users, eq(linksUsers.userId, users.id))
      .where(eq(users.id, userId))
  },

  async getById({ linkId, userId }) {
    const [userLink] = await db
      .select({
        id: links.id,
        url: links.url,
        title: links.title,
        cleaned: links.cleaned,
        summary: links.summary,
        createdAt: links.createdAt,
      })
      .from(links)
      .innerJoin(linksUsers, eq(links.id, linksUsers.linkId))
      .innerJoin(users, eq(linksUsers.userId, users.id))
      .where(and(eq(links.id, linkId), eq(users.id, userId)))
      .limit(1)

    return userLink
  },
})

// Export the repository
export const linkRepository = createLinkRepository()
