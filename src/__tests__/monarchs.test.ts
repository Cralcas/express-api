import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Monarchs API", () => {
  it("GET /api/monarchs should return all monarchs", async () => {
    const res = await request(app).get("/api/monarchs");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/monarchs/search?term=henry should return results", async () => {
    const res = await request(app).get("/api/monarchs/search?house=vasa");
    expect(res.statusCode).toBe(200);
  });

  it("GET /api/monarchs/filter/birthYear/1491 should return results", async () => {
    const res = await request(app).get("/api/monarchs/filter/birthYear/1594");
    expect(res.statusCode).toBe(200);
  });

  it("GET /api/monarchs/filter/invalidField/1234 should return 400", async () => {
    const res = await request(app).get("/api/monarchs/filter/invalidField/1234");
    expect(res.statusCode).toBe(400);
  });
});
