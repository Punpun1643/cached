import {
  pgTable,
  text,
  pgEnum,
  serial,
  varchar
} from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', ['read', 'pending', 'archived'])

export const urls = pgTable('urls', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  status: statusEnum('status').notNull(),
  tag: varchar('tag', { length: 128 }),
  address: text('address').notNull(),
  dateAdded: varchar('date_added', { length: 50 }).notNull()
})

// Export db types for other components
export type SelectUrl = typeof urls.$inferSelect
export type InsertUrl = typeof urls.$inferInsert

