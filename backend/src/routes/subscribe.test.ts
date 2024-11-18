import request from "supertest";
import mongoose from "mongoose";
import Subscribe from "src/models/Subscribe";
import { createTestApp } from "src/utils/test/testUtils";
import { EmailService } from "src/services/EmailService";

// Mock EmailService
jest.mock("src/services/EmailService");

const app = createTestApp();

describe("Subscribe Routes", () => {
  const validSubscribeData = {
    email: "test@example.com"
  };

  beforeEach(async () => {
    await Subscribe.deleteMany({});
    jest.clearAllMocks();
  });

  describe("GET /api/subscribe", () => {
    it("should return all subscriptions", async () => {
      await Subscribe.create(validSubscribeData);
      
      const res = await request(app)
        .get("/api/subscribe");
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(1);
    });
  });

  describe("PUT /api/subscribe/:id", () => {
    it("should update a subscription", async () => {
      const subscription = await Subscribe.create(validSubscribeData);
      const updateData = { email: "updated@example.com" };
      
      const res = await request(app)
        .put(`/api/subscribe/${subscription._id}`)
        .send(updateData);
      
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Subscription updated successfully");
      expect(res.body.updatedSubscription.email).toBe(updateData.email);
    });

    it("should return 400 for invalid email format", async () => {
      const subscription = await Subscribe.create(validSubscribeData);
      
      const res = await request(app)
        .put(`/api/subscribe/${subscription._id}`)
        .send({ email: "invalid-email" });
      
      expect(res.status).toBe(400);
    });
  });

  describe("DELETE /api/subscribe/:id", () => {
    it("should delete a subscription", async () => {
      const subscription = await Subscribe.create(validSubscribeData);
      
      const res = await request(app)
        .delete(`/api/subscribe/${subscription._id}`);
      
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Subscription deleted successfully");
      
      const deletedSubscription = await Subscribe.findById(subscription._id);
      expect(deletedSubscription).toBeNull();
    });
  });
});
