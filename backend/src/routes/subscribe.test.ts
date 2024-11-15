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

  describe("POST /api/subscribe", () => {
    it("should create a new subscription and send welcome email", async () => {
      const res = await request(app)
        .post("/api/subscribe")
        .send(validSubscribeData);
      
      expect(res.status).toBe(201);
      expect(res.body.message).toBe("Subscription created successfully and welcome email sent");
      
      // Verify EmailService was called
      expect(EmailService.prototype.sendWelcomeEmail)
        .toHaveBeenCalledWith(validSubscribeData.email);
    });

    it("should return 500 if subscription creation fails", async () => {
      // Mock Subscribe.save to throw error
      jest.spyOn(mongoose.Model.prototype, 'save')
        .mockRejectedValueOnce(new Error("DB Error"));

      const res = await request(app)
        .post("/api/subscribe")
        .send(validSubscribeData);
      
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to create subscription or send welcome email");
    });
  });

  describe("GET /api/subscribe", () => {
    it("should return all subscriptions", async () => {
      await Subscribe.create(validSubscribeData);
      
      const res = await request(app).get("/api/subscribe");
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(1);
      expect(res.body[0].email).toBe(validSubscribeData.email);
    });
  });

  describe("GET /api/subscribe/:id", () => {
    it("should return a subscription by id", async () => {
      const subscription = await Subscribe.create(validSubscribeData);
      
      const res = await request(app).get(`/api/subscribe/${subscription._id}`);
      
      expect(res.status).toBe(200);
      expect(res.body.email).toBe(validSubscribeData.email);
    });

    it("should return 404 for non-existent subscription", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/subscribe/${fakeId}`);
      
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Subscription not found");
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

    it("should return 404 for non-existent subscription", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/api/subscribe/${fakeId}`)
        .send({ email: "test@example.com" });
      
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Subscription not found");
    });
  });

  describe("DELETE /api/subscribe/:id", () => {
    it("should delete a subscription", async () => {
      const subscription = await Subscribe.create(validSubscribeData);
      
      const res = await request(app).delete(`/api/subscribe/${subscription._id}`);
      
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Subscription deleted successfully");
      
      const deletedSubscription = await Subscribe.findById(subscription._id);
      expect(deletedSubscription).toBeNull();
    });

    it("should return 404 for non-existent subscription", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/api/subscribe/${fakeId}`);
      
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Subscription not found");
    });
  });
});
