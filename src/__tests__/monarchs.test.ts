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

  it("GET /api/monarchs:id should return one monarch", async () => {
    const res = await request(app).get("/api/monarchs/2");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("birthName");
    expect(typeof res.body.birthYear).toBe("number");
  });

  it("GET /api/monarchs/:id should return 404 for non-existent monarch", async () => {
    const res = await request(app).get("/api/monarchs/999999");
    expect(res.statusCode).toBe(404);
  });

  it("POST /api/monarchs should create a new monarch", async () => {
    const newMonarch = {
      birthName: "Gustav Adolf",
      regnalName: "Gustav II Adolf",
      firstName: "Gustav",
      regnal: "II",
      house: "Vasa",
      birthYear: 1594,
      deathYear: 1632,
      reignStart: 1611,
      reignEnd: 1632,
      birthPlace: "Stockholm, Sweden",
      religion: "Lutheran",
      burialPlace: "Riddarholm Church, Stockholm, Sweden",
      imageUrl: "/images/image-placeholder.jpeg",
      bio: "Gustav II Adolf, known as the Lion of the North, was a brilliant military commander and king of Sweden who led the nation to major victories during the Thirty Years' War.",
    };

    const res = await request(app)
      .post("/api/monarchs")
      .send(newMonarch)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.firstName).toBe("Gustav");
  });

  it("PUT /api/monarchs:id should update monarch", async () => {
    const updatedMonarch = {
      firstName: "Gustavvv",
    };

    const res = await request(app)
      .put("/api/monarchs/6")
      .send(updatedMonarch)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe("Gustavvv");
  });

  it("DELETE /api/monarchs/6 should successfully delete a monarch and return a message with the ID", async () => {
    const res = await request(app).delete("/api/monarchs/6").set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      message: "Monarch deleted successfully",
      id: 6,
    });
  });
});
