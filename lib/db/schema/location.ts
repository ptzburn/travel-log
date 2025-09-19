import { int, real, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { user } from "./auth.ts";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const location = sqliteTable("location", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  lat: real().notNull(),
  long: real().notNull(),
  userId: int().notNull().references(() => user.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() =>
    Date.now()
  ),
}, (table) => [
  unique().on(table.name, table.userId),
]);

export const InsertLocationSchema = createInsertSchema(location, {
  name: (field) => field.min(1).max(100),
  description: (field) => field.max(1000),
  lat: (field) => field.min(-90).max(90),
  long: (field) => field.min(-180).max(180),
}).omit({
  id: true,
  slug: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertLocation = z.infer<typeof InsertLocationSchema>;
