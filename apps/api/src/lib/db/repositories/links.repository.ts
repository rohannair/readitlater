import { integer } from 'drizzle-orm/pg-core'
import { type Link, links, linksUsers, users } from '@/lib/db/schema'
import { stripQueryParams } from '@/lib/url'
import { createId } from '@paralleldrive/cuid2'
import { image } from '@tensorflow/tfjs-node'
import { and, desc, eq, sql } from 'drizzle-orm'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

interface LinkRepository {
  createLink(input: {
    url: string
    userId: string
    imageUrl?: string
  }): Promise<Partial<Link>>
  updateLink(params: {
    id: string
    body?: string
    title?: string
    summary?: string
    imageUrl?: string
    status?: 'submitted' | 'processing' | 'completed' | 'error'
    statusReason?: string
  }): Promise<Link>
  getAllForUser(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<{
    links: Partial<Link>[] | undefined[]
    pagination: {
      page: number
      pageSize: number
      totalCount: number
      totalPages: number
    }
  }>
  getById(params: { linkId: string; userId: string }): Promise<
    Partial<Link> | undefined
  >
  deleteForUser(params: { linkId: string; userId: string }): Promise<void>
  getMetadata(id: string): Promise<{
    linksCount: number
    categoriesCount: number
    tagsCount: number
  }>
}

export const createLinkRepository = (
  client?: PostgresJsDatabase,
): LinkRepository => {
  const db = client ?? globalThis.db
  return {
    async createLink({ url, userId, imageUrl }) {
      if (!url) {
        throw new Error('URL is required')
      }

      return await db.transaction(async (tx) => {
        const [link] = await tx
          .insert(links)
          .values({
            id: createId(),
            url: stripQueryParams(url),
            ...(imageUrl ? { imageUrl } : null),
          })
          .onConflictDoUpdate({
            target: links.url,
            set: {
              updatedAt: sql`now()`,
            },
          })
          .returning({
            id: links.id,
            url: links.url,
            status: links.status,
          })

        await tx
          .insert(linksUsers)
          .values({
            linkId: link.id,
            userId: userId,
          })
          .onConflictDoNothing()

        return link
      })
    },

    async updateLink({
      id,
      body,
      title,
      summary,
      status,
      statusReason,
      imageUrl,
    }) {
      const [link] = await db
        .update(links)
        .set({
          ...(body ? { cleaned: body } : null),
          ...(title ? { title } : null),
          ...(summary ? { summary } : null),
          ...(status ? { status } : null),
          ...(statusReason ? { statusReason } : null),
          ...(imageUrl ? { imageUrl } : null),
          updatedAt: sql`now()`,
        })
        .where(eq(links.id, id))
        .returning()

      return link
    },

    async getAllForUser(userId, page = 1, pageSize = 10) {
      const offset = (page - 1) * pageSize

      const results = await db
        .select({
          id: links.id,
          url: links.url ?? '',
          title: links.title ?? '',
          imageUrl: links.imageUrl ?? '',
          status: links.status,
          createdAt: links.createdAt,
        })
        .from(links)
        .innerJoin(linksUsers, eq(links.id, linksUsers.linkId))
        .innerJoin(users, eq(linksUsers.userId, users.id))
        .where(eq(users.id, userId))
        .limit(pageSize)
        .offset(offset)
        .orderBy(desc(links.createdAt))

      const totalCount = await db
        .select({ count: sql`count(*)` })
        .from(links)
        .innerJoin(linksUsers, eq(links.id, linksUsers.linkId))
        .innerJoin(users, eq(linksUsers.userId, users.id))
        .where(eq(users.id, userId))
        .then((res) => Number(res[0].count))

      const totalPages = Math.ceil(totalCount / pageSize)

      return {
        links: results,
        pagination: {
          page,
          pageSize,
          totalCount,
          totalPages,
        },
      }
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
          updatedAt: links.updatedAt,
          status: links.status,
        })
        .from(links)
        .innerJoin(linksUsers, eq(links.id, linksUsers.linkId))
        .innerJoin(users, eq(linksUsers.userId, users.id))
        .where(and(eq(links.id, linkId), eq(users.id, userId)))
        .limit(1)

      return userLink
    },
    async deleteForUser({ linkId, userId }) {
      await db
        .delete(linksUsers)
        .where(
          and(eq(linksUsers.linkId, linkId), eq(linksUsers.userId, userId)),
        )
    },
    async getMetadata(id) {
      const [data] = await db
        .select({
          linksCount: sql<number>`cast(count(${linksUsers.linkId}) as int)`,
        })
        .from(linksUsers)
        .where(eq(linksUsers.userId, id))

      return { ...data, categoriesCount: 0, tagsCount: 0 }
    },
  }
}

// Export the repository
export const linkRepository = createLinkRepository()
