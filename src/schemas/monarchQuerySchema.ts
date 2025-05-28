import { z } from "zod";

export const monarchQuerySchema = z
  .object({
    s: z.string().optional(),
    regnalName: z.string().optional(),
    birthName: z.string().optional(),
    firstName: z.string().optional(),
    regnal: z.string().optional(),
    house: z.string().optional(),
    birthYear: z.coerce.number().optional(),
    deathYear: z.coerce.number().optional(),
    birthPlace: z.string().optional(),
    religion: z.string().optional(),
    burialPlace: z.string().optional(),
    page: z.coerce.number().int().positive().default(1).optional(),
    pageSize: z.coerce.number().int().positive().default(10).optional(),
  })
  .strict();

export type MonarchQueryParams = z.infer<typeof monarchQuerySchema>;
