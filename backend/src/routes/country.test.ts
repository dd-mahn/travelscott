import request from "supertest";
import mongoose from "mongoose";
import Country from "src/models/Country";
import { createTestApp } from "src/utils/test/testUtils";

const app = createTestApp();

describe("Country Routes", () => {
  const validCountryData = {
    name: "Test Country",
    continent: "Asia",
    description: ["A beautiful country"],
  };

  beforeEach(async () => {
    await Country.deleteMany({});
  });

  describe("GET /api/countries", () => {
    it("should return all countries", async () => {
      await Country.create(validCountryData);
      
      const res = await request(app).get("/api/countries");
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data.result)).toBeTruthy();
      expect(res.body.data.result.length).toBe(1);
    });
  });

  describe("POST /api/countries", () => {
    it("should create a new country", async () => {
      const res = await request(app)
        .post("/api/countries")
        .send(validCountryData);
      
      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe(validCountryData.name);
    });

    it("should return 400 for invalid data", async () => {
      const invalidData = { ...validCountryData, name: "" };
      
      const res = await request(app)
        .post("/api/countries")
        .send(invalidData);
      
      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/countries/:id", () => {
    it("should return a country by id", async () => {
      const country = await Country.create(validCountryData);
      
      const res = await request(app).get(`/api/countries/${country._id}`);
      
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe(validCountryData.name);
    });

    it("should return 404 for non-existent country", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/countries/${fakeId}`);
      
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/countries/:id", () => {
    it("should update a country", async () => {
      const country = await Country.create(validCountryData);
      const updateData = {
        ...validCountryData,
        name: "Updated Country",
      };
      
      const res = await request(app)
        .put(`/api/countries/${country._id}`)
        .send(updateData);
      
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("Updated Country");
    });
  });

  describe("PUT /api/countries/:id/total", () => {
    it("should update total destinations", async () => {
      const country = await Country.create(validCountryData);
      
      const res = await request(app)
        .put(`/api/countries/${country._id}/total`);
      
      expect(res.status).toBe(200);
      expect(res.body.data.totalDestinations).toBeDefined();
    });
  });

  describe("DELETE /api/countries/:id", () => {
    it("should delete a country", async () => {
      const country = await Country.create(validCountryData);
      
      const res = await request(app).delete(`/api/countries/${country._id}`);
      
      expect(res.status).toBe(200);
      const deletedCountry = await Country.findById(country._id);
      expect(deletedCountry).toBeNull();
    });
  });
});
