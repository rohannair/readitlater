import { type Category, categories } from '@/lib/db/schema'
import { createId } from '@paralleldrive/cuid2'
import { and, desc, eq, sql } from 'drizzle-orm'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

interface CategoryRepository {
  createCategory(input: { name: string; userId: string }): Promise<
    Partial<Category>
  >
  updateCategory(params: { id: number; name: string }): Promise<Category>
  get(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<{
    categories: Partial<Category>[]
    pagination: {
      page: number
      pageSize: number
      totalCount: number
      totalPages: number
    }
  }>
  getById(params: { categoryId: number; userId: string }): Promise<
    Partial<Category> | undefined
  >
  deleteForUser(params: { categoryId: number; userId: string }): Promise<void>
}

export const createCategoryRepository = (
  client?: PostgresJsDatabase,
): CategoryRepository => {
  const db = client ?? (global as any).db

  return {
    async createCategory({ name, userId }) {
      const [category] = await db
        .insert(categories)
        .values({ id: createId(), name, userId })
        .returning({ id: categories.id, name: categories.name })

      return category
    },

    async updateCategory({ id, name }) {
      const [updatedCategory] = await db
        .update(categories)
        .set({ name, updatedAt: new Date() })
        .where(eq(categories.id, id))
        .returning()

      return updatedCategory
    },

    async get(userId, page, pageSize) {
      const offset = (page - 1) * pageSize
      const [{ count }] = await db
        .select({ count: sql<number>`count(*)` })
        .from(categories)
        .where(eq(categories.userId, userId))

      const results = await db
        .select({
          id: categories.id,
          name: categories.name,
          createdAt: categories.createdAt,
          updatedAt: categories.updatedAt,
        })
        .from(categories)
        .where(eq(categories.userId, userId))
        .orderBy(desc(categories.createdAt))
        .limit(pageSize)
        .offset(offset)

      const totalCount = Number(count)
      const totalPages = Math.ceil(totalCount / pageSize)

      return {
        categories: results,
        pagination: {
          page,
          pageSize,
          totalCount,
          totalPages,
        },
      }
    },

    async getById({ categoryId, userId }) {
      const [category] = await db
        .select({
          id: categories.id,
          name: categories.name,
          createdAt: categories.createdAt,
          updatedAt: categories.updatedAt,
        })
        .from(categories)
        .where(
          and(eq(categories.id, categoryId), eq(categories.userId, userId)),
        )
        .limit(1)

      return category
    },

    async deleteForUser({ categoryId, userId }) {
      await db
        .delete(categories)
        .where(
          and(eq(categories.id, categoryId), eq(categories.userId, userId)),
        )
    },
  }
}

export const categoryRepository = createCategoryRepository()
