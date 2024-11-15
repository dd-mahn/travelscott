import request from "supertest";
import mongoose from "mongoose";
import Feedback from "src/models/Feedback";
import { createTestApp } from "src/utils/test/testUtils";

const app = createTestApp();

describe("Feedback Routes", () => {
  const validFeedbackData = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    age: 30,
    country: "United States",
    message: "This is a test feedback message"
  };

  beforeEach(async () => {
    await Feedback.deleteMany({});
  });

  describe("POST /api/feedback", () => {
    it("should create a new feedback", async () => {
      const res = await request(app)
        .post("/api/feedback")
        .send(validFeedbackData);
      
      expect(res.status).toBe(201);
      expect(res.body.data.firstName).toBe(validFeedbackData.firstName);
      expect(res.body.data.email).toBe(validFeedbackData.email);
    });

    it("should return 400 for invalid feedback data", async () => {
      const invalidData = { ...validFeedbackData, email: "invalid-email" };
      
      const res = await request(app)
        .post("/api/feedback")
        .send(invalidData);
      
      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/feedback", () => {
    it("should return all feedback", async () => {
      await Feedback.create(validFeedbackData);
      
      const res = await request(app).get("/api/feedback");
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBeTruthy();
      expect(res.body.data.length).toBe(1);
    });
  });

  describe("GET /api/feedback/:id", () => {
    it("should return a feedback by id", async () => {
      const feedback = await Feedback.create(validFeedbackData);
      
      const res = await request(app).get(`/api/feedback/${feedback._id}`);
      
      expect(res.status).toBe(200);
      expect(res.body.data.firstName).toBe(validFeedbackData.firstName);
    });

    it("should return 404 for non-existent feedback", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/feedback/${fakeId}`);
      
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /api/feedback/:id", () => {
    it("should delete a feedback", async () => {
      const feedback = await Feedback.create(validFeedbackData);
      
      const res = await request(app).delete(`/api/feedback/${feedback._id}`);
      
      expect(res.status).toBe(200);
      const deletedFeedback = await Feedback.findById(feedback._id);
      expect(deletedFeedback).toBeNull();
    });

    it("should return 404 for non-existent feedback", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/api/feedback/${fakeId}`);
      
      expect(res.status).toBe(404);
    });
  });
});
