import { z } from "zod"
import {
  pgTable,
  text,
  pgEnum,
  serial,
  varchar
} from 'drizzle-orm/pg-core';

const statusEnum = pgEnum('status', ['read', 'pending', 'archived'])
export const StatusEnum = z.enum(statusEnum.enumValues)

export const urls = pgTable('urls', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  status: statusEnum('status').notNull(),
  tag: varchar('tag', { length: 128 }).notNull(),
  address: text('address').notNull(),
  dateAdded: varchar('date_added', { length: 50 }).notNull()
})

// Export db types for other components
export type SelectUrl = typeof urls.$inferSelect
export type InsertUrl = typeof urls.$inferInsert
export type StatusEnum = z.infer<typeof StatusEnum>
