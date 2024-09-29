import {
  pgTable,
  text,
  timestamp,
  pgEnum,
  serial,
  varchar
} from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', ['read', 'pending'])

export const urls = pgTable('urls', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  status: statusEnum('status').notNull(),
  tag: varchar('tag', { length: 128 }),
  address: text('address').notNull(),
  dateAdded: timestamp('date_added').notNull().defaultNow()
})

// Export db types for other components
export type Url = typeof urls.$inferSelect
export type InsertUrl = typeof urls.$inferInsert

