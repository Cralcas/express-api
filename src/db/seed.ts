import "dotenv/config";
import { db } from "./index.js";
import { monarchsTable } from "./schema.js";
import { monarchsData } from "../data/data.js";

async function seed() {
  try {
    await db.insert(monarchsTable).values(monarchsData);
    console.log("Seeded monarch successfully!");
  } catch (error) {
    console.error("Failed to seed:", error);
  }
}

seed();
