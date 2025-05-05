import "dotenv/config";
import { db } from "./index";
import { monarchs } from "./schema";
import { monarchsData } from "../data/data";

async function seed() {
  try {
    await db.insert(monarchs).values(monarchsData);
    console.log("✅ Seeded monarch successfully!");
  } catch (err) {
    console.error("❌ Failed to seed:", err);
  }
}

seed();
