import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema.js";

let connectionString: string;

if (process.env.NODE_ENV === "test") {
  connectionString = process.env.TEST_DATABASE_URL!;
} else {
  connectionString = process.env.DATABASE_URL!;
}

const client = neon(connectionString);
export const db = drizzle(client, { schema });
