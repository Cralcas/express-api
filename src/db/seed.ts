import "dotenv/config";
import { db } from "./index.js";
import { monarchsTable } from "./schema.js";
import { monarchsData } from "../data/data.js";

async function seed() {
  try {
    console.log("Clearing existing monarch data...");
    await db.delete(monarchsTable);

    console.log("Seeding new monarch data...");
    await db.insert(monarchsTable).values(monarchsData);

    console.log("Seeded monarchs successfully!");
  } catch (error) {
    console.error("Failed to seed:", error);
  }
}

seed();
