//Database Schema

import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";

export const event = sqliteTable("event", {
  id: integer("id").primaryKey(),
  randomId: text("randomId").default(sql`hash(${id})`),
});
