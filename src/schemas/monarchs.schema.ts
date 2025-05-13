import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { monarchsTable } from "../db/schema.js";

const baseInsertSchema = createInsertSchema(monarchsTable);

export const insertMonarchSchema = baseInsertSchema.extend({
  birthName: z.string().min(1, "birth name is required"),
  regnalName: z.string().min(1, "regnal name is required"),
  firstName: z.string().min(1, "first name is required"),
  regnal: z.string().optional(),
  house: z.string().min(1, "house is required"),
  birthYear: z.number().int().min(0),
  deathYear: z.number().int().min(0),
  reignStart: z.number().int().min(0),
  reignEnd: z.number().int().min(0),
  birthPlace: z.string().min(1, "birth place is required"),
  religion: z.string().min(1, "religion is required"),
  burialPlace: z.string().min(1, "burial place is required"),
  imageUrl: z.string().default("/images/image-placeholder.jpeg"),
  bio: z.string().min(10, "bio must be at least 10 characters"),
});

export const updateMonarchSchema = insertMonarchSchema.partial();
