import {
  type Link,
  links,
  linksUsers,
  users,
  tags,
  categories,
  linksTags,
  linksCategories,
} from '@/lib/db/schema'
import { stripQueryParams } from '@/lib/url'
import { createId } from '@paralleldrive/cuid2'
import { and, desc, eq, sql } from 'drizzle-orm'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

interface CreateLinkInput {
  url: string
  userId: string
  title?: string
  imageUrl?: string
}

interface UpdateLinkParams {
  id: string
  body?: string
  title?: string
  summary?: string
  imageUrl?: string
  status?: 'submitted' | 'processing' | 'completed' | 'error'
  statusReason?: string
}

interface GetLinksParams {
  userId: string
  page: number
  pageSize: number
  query?: string
}

interface GetLinkByIdParams {
  linkId: string
  userId: string
}

interface DeleteLinkParams {
  linkId: string
  userId: string
}

interface LinkMetadata {
  linksCount: number
  categoriesCount: number
  tagsCount: number
}

interface LinkRepository {
  createLink(input: CreateLinkInput): Promise<Partial<Link>>
  updateLink(params: UpdateLinkParams): Promise<Link>
  get(params: GetLinksParams): Promise<{
    links: Partial<Link>[]
    pagination: {
      page: number
      pageSize: number
      totalCount: number
      totalPages: number
    }
  }>
  getById(params: GetLinkByIdParams): Promise<Partial<Link> | undefined>
  deleteForUser(params: DeleteLinkParams): Promise<void>
  getMetadata(id: string): Promise<LinkMetadata>
  addTagToLink(linkId: string, tagId: number): Promise<void>
  removeTagFromLink(linkId: string, tagId: number): Promise<void>
  addCategoryToLink(linkId: string, categoryId: number): Promise<void>
  removeCategoryFromLink(linkId: string, categoryId: number): Promise<void>
  getTagsForLink(linkId: string): Promise<{ id: number; name: string | null }[]>
  getCategoriesForLink(
    linkId: string,
  ): Promise<{ id: number; name: string | null }[]>
}

export const createLinkRepository = (
  client?: PostgresJsDatabase,
): LinkRepository => {
  const db = client ?? globalThis.db
  return {
    async createLink({ url, userId, title, imageUrl }) {
      if (!url) {
        throw new Error('URL is required')
      }

      return await db.transaction(async (tx) => {
        const [link] = await tx
          .insert(links)
          .values({
            id: createId(),
            url: stripQueryParams(url),
            ...(title ? { title } : null),
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
            title: links.title,
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
      const updatedFields = {
        ...(body && { cleaned: body }),
        ...(title && { title }),
        ...(summary && { summary }),
        ...(status && { status }),
        ...(statusReason && { statusReason }),
        ...(imageUrl && { imageUrl }),
        updatedAt: sql`now()`,
      }

      const [link] = await db
        .update(links)
        .set(updatedFields)
        .where(eq(links.id, id))
        .returning()

      return link
    },

    async get({ userId, page = 1, pageSize = 10, query }) {
      const offset = (page - 1) * pageSize

      const matchQuery = sql`(
          setweight(to_tsvector('english', ${links.title}), 'A') ||
          setweight(to_tsvector('english', ${links.cleaned}), 'B')
        ) @@ to_tsquery('english', ${query})`

      const { results, totalCount } = await db.transaction(async (tx) => {
        const results = await tx
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
          .where(and(eq(users.id, userId), query ? matchQuery : undefined))
          .limit(pageSize)
          .offset(offset)
          .orderBy(desc(links.createdAt))

        const [countResult] = await tx
          .select({ count: sql`count(*)` })
          .from(links)
          .innerJoin(linksUsers, eq(links.id, linksUsers.linkId))
          .innerJoin(users, eq(linksUsers.userId, users.id))
          .where(eq(users.id, userId))

        return {
          results,
          totalCount: Number(countResult.count),
        }
      })

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
    async addTagToLink(linkId: string, tagId: number) {
      await db.insert(linksTags).values({ linkId, tagId }).onConflictDoNothing()
    },

    async removeTagFromLink(linkId: string, tagId: number) {
      await db
        .delete(linksTags)
        .where(and(eq(linksTags.linkId, linkId), eq(linksTags.tagId, tagId)))
    },

    async addCategoryToLink(linkId: string, categoryId: number) {
      await db
        .insert(linksCategories)
        .values({ linkId, categoryId })
        .onConflictDoNothing()
    },

    async removeCategoryFromLink(linkId: string, categoryId: number) {
      await db
        .delete(linksCategories)
        .where(
          and(
            eq(linksCategories.linkId, linkId),
            eq(linksCategories.categoryId, categoryId),
          ),
        )
    },

    async getTagsForLink(linkId: string) {
      return db
        .select({ id: tags.id, name: tags.name })
        .from(tags)
        .innerJoin(linksTags, eq(tags.id, linksTags.tagId))
        .where(eq(linksTags.linkId, linkId))
    },

    async getCategoriesForLink(linkId: string) {
      return db
        .select({ id: categories.id, name: categories.name })
        .from(categories)
        .innerJoin(
          linksCategories,
          eq(categories.id, linksCategories.categoryId),
        )
        .where(eq(linksCategories.linkId, linkId))
    },

    async getMetadata(id) {
      const [data] = await db
        .select({
          linksCount: sql<number>`cast(count(distinct ${linksUsers.linkId}) as int)`,
          categoriesCount: sql<number>`cast(count(distinct ${linksCategories.categoryId}) as int)`,
          tagsCount: sql<number>`cast(count(distinct ${linksTags.tagId}) as int)`,
        })
        .from(linksUsers)
        .leftJoin(links, eq(linksUsers.linkId, links.id))
        .leftJoin(linksTags, eq(linksUsers.linkId, linksTags.linkId))
        .leftJoin(
          linksCategories,
          eq(linksUsers.linkId, linksCategories.linkId),
        )
        .where(eq(linksUsers.userId, id))

      return data
    },
  }
}

// Export the repository
export const linkRepository = createLinkRepository()
