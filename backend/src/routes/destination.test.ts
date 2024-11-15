import request from "supertest";
import mongoose from "mongoose";
import Destination from "src/models/Destination";
import { createTestApp } from "src/utils/test/testUtils";

const app = createTestApp();

describe("Destination Routes", () => {
  const validDestinationData = {
    name: "Test Destination",
    video: "test-video.mp4",
    country: "Test Country",
    continent: "Asia",
    location: "Test Location",
    description: "A beautiful destination",
    places: {
      mustSee: ["Place 1"],
      restaurants: ["Restaurant 1"],
      hotels: ["Hotel 1"]
    },
    transportation: {
      gettingThere: ["By Bus"],
      gettingAround: ["Walking"]
    },
    insight: {
      bestTime: ["Spring"],
      budget: ["Budget-friendly"],
      tips: ["Pack light"]
    },
    tags: ["Wilderness", "Culture&Heritage"],
    summary: "Test summary",
    featured: true
  };

  beforeEach(async () => {
    await Destination.deleteMany({});
  });

  describe("GET /api/destinations", () => {
    it("should return all destinations", async () => {
      await Destination.create(validDestinationData);
      
      const res = await request(app).get("/api/destinations");
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data.result)).toBeTruthy();
      expect(res.body.data.result.length).toBe(1);
    });

    it("should filter destinations by featured", async () => {
      await Destination.create(validDestinationData);
      
      const res = await request(app).get("/api/destinations?featured=true");
      
      expect(res.status).toBe(200);
      expect(res.body.data.result[0].featured).toBe(true);
    });
  });

  describe("POST /api/destinations", () => {
    it("should create a new destination", async () => {
      const res = await request(app)
        .post("/api/destinations")
        .send(validDestinationData);
      
      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe(validDestinationData.name);
    });

    it("should return 400 for invalid data", async () => {
      const invalidData = { ...validDestinationData, name: "" };
      
      const res = await request(app)
        .post("/api/destinations")
        .send(invalidData);
      
      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/destinations/:id", () => {
    it("should return a destination by id", async () => {
      const destination = await Destination.create(validDestinationData);
      
      const res = await request(app).get(`/api/destinations/${destination._id}`);
      
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe(validDestinationData.name);
    });

    it("should return 404 for non-existent destination", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/destinations/${fakeId}`);
      
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/destinations/:id", () => {
    it("should update a destination", async () => {
      const destination = await Destination.create(validDestinationData);
      const updateData = {
        ...validDestinationData,
        name: "Updated Destination"
      };
      
      const res = await request(app)
        .put(`/api/destinations/${destination._id}`)
        .send(updateData);
      
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("Updated Destination");
    });
  });

  describe("PUT /api/destinations/:id/places", () => {
    it("should update destination places", async () => {
      const destination = await Destination.create(validDestinationData);
      const newPlaces = {
        to_visit: [{
          name: "New Place",
          type: "Must See"
        }],
        to_eat: [{
          name: "New Restaurant"
        }],
        to_stay: [{
          name: "New Hotel"
        }]
      };
      
      const res = await request(app)
        .put(`/api/destinations/${destination._id}/places`)
        .send(newPlaces);
      
      expect(res.status).toBe(200);
    });
  });

  describe("PUT /api/destinations/:id/transportation", () => {
    it("should update destination transportation", async () => {
      const destination = await Destination.create(validDestinationData);
      const newTransportation = {
        overview: "Transportation overview",
        types: [{
          name: "Train",
          description: "Train transportation",
          quick_review: "Convenient option"
        }]
      };
      
      const res = await request(app)
        .put(`/api/destinations/${destination._id}/transportation`)
        .send(newTransportation);
      
      expect(res.status).toBe(200);
    });
  });

  describe("PUT /api/destinations/:id/insight", () => {
    it("should update destination insight", async () => {
      const destination = await Destination.create(validDestinationData);
      const newInsight = {
        from_us: {
          tips: ["Book in advance"]
        },
        from_others: [{
          title: "Summer Travel Guide",
          link: "https://example.com"
        }]
      };
      
      const res = await request(app)
        .put(`/api/destinations/${destination._id}/insight`)
        .send(newInsight);
      
      expect(res.status).toBe(200);
    });
  });

  describe("DELETE /api/destinations/:id", () => {
    it("should delete a destination", async () => {
      const destination = await Destination.create(validDestinationData);
      
      const res = await request(app).delete(`/api/destinations/${destination._id}`);
      
      expect(res.status).toBe(200);
      const deletedDestination = await Destination.findById(destination._id);
      expect(deletedDestination).toBeNull();
    });
  });

  describe("DELETE /api/destinations", () => {
    it("should delete all destinations", async () => {
      await Destination.create(validDestinationData);
      await Destination.create({...validDestinationData, name: "Another Destination"});
      
      const res = await request(app).delete("/api/destinations");
      
      expect(res.status).toBe(200);
      const remainingDestinations = await Destination.find();
      expect(remainingDestinations.length).toBe(0);
    });
  });

  describe("GET /api/destinations/search", () => {
    it("should search destinations by name and country", async () => {
      await Destination.create(validDestinationData);
      
      const res = await request(app)
        .get("/api/destinations/search")
        .query({ name: "Test", country: "Test Country" });
      
      expect(res.status).toBe(200);
      expect(res.body.data.result.length).toBe(1);
      expect(res.body.data.result[0].name).toBe(validDestinationData.name);
    });

    it("should return 400 if no search params provided", async () => {
      const res = await request(app).get("/api/destinations/search");
      
      expect(res.status).toBe(400);
    });
  });
});
