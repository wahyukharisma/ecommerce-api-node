import {
  integer,
  pgTable,
  varchar,
  text,
  doublePrecision
} from "drizzle-orm/pg-core";

import { createInsertSchema } from "drizzle-zod";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 255 }),
  price: doublePrecision().notNull()
});

export const createProductSchema = createInsertSchema(productsTable);

export const updateProductSchema = createInsertSchema(productsTable);