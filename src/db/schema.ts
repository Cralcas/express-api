import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";

export const monarchsTable = pgTable("monarchs", {
  id: serial("id").primaryKey(),
  birthName: text("birth_name").notNull(),
  regnalName: text("regnal_name").notNull(),
  firstName: text("first_name").notNull(),
  regnal: text("regnal"),
  house: text("house").notNull(),
  birthYear: integer("birth_year").notNull(),
  deathYear: integer("death_year").notNull(),
  reignStart: integer("reign_start").notNull(),
  reignEnd: integer("reign_end").notNull(),
  birthPlace: text("birth_place").notNull(),
  religion: text("religion").notNull(),
  burialPlace: text("burial_place").notNull(),
  imageUrl: text("image_url").notNull(),
  bio: text("bio").notNull(),
});
