import { db } from '@/lib/db'
import { tags, type Tag, type NewTag } from '@/lib/db/schema/tags'
import { eq, and, sql } from 'drizzle-orm'

export const tagsRepository = {
  async create(data: NewTag): Promise<Tag> {
    const [tag] = await db.insert(tags).values(data).returning()
    return tag
  },

  async findById(id: number): Promise<Tag | undefined> {
    const [tag] = await db.select().from(tags).where(eq(tags.id, id))
    return tag
  },

  async findByUserId(
    userId: string,
    page = 1,
    pageSize = 10,
  ): Promise<{
    tags: Tag[]
    pagination: {
      page: number
      pageSize: number
      totalCount: number
      totalPages: number
    }
  }> {
    const offset = (page - 1) * pageSize

    const [newTags, [countResult]] = await Promise.all([
      db
        .select()
        .from(tags)
        .where(eq(tags.userId, userId))
        .limit(pageSize)
        .offset(offset),
      db
        .select({ count: sql`count(*)` })
        .from(tags)
        .where(eq(tags.userId, userId)),
    ])

    const totalCount = Number(countResult.count)
    const totalPages = Math.ceil(totalCount / pageSize)

    return {
      tags: newTags,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages,
      },
    }
  },

  async search(query: string, userId: string): Promise<Tag[]> {
    return db
      .select()
      .from(tags)
      .where(
        and(
          eq(tags.userId, userId),
          sql`to_tsvector('english', ${tags.name}) @@ to_tsquery('english', ${query})`,
        ),
      )
  },

  async update(id: number, data: Partial<NewTag>): Promise<Tag | undefined> {
    const [tag] = await db
      .update(tags)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(tags.id, id))
      .returning()
    return tag
  },

  async delete(id: number): Promise<void> {
    await db.delete(tags).where(eq(tags.id, id))
  },
}
