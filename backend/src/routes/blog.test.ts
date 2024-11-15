import request from "supertest";
import mongoose from "mongoose";
import Blog from "src/models/Blog";
import { createTestApp } from "src/utils/test/testUtils";
import { getCurrentDate } from "src/utils/getCurrentDate";

const app = createTestApp();

describe("Blog Routes", () => {
  const validBlogData = {
    title: "Test Blog",
    author: "John Doe", 
    category: "Wilderness",
    image: "test.jpg",
    content: [{
      sectionTitle: "Introduction",
      sectionImages: [{ url: "image1.jpg" }],
      sectionText: ["This is a test blog content"]
    }],
    time: getCurrentDate(),
    tags: ["test", "blog"],
    related_destination: "Test Destination",
    featured: true
  };

  beforeEach(async () => {
    await Blog.deleteMany({});
  });

  describe("POST /api/blogs", () => {
    it("should create a new blog post", async () => {
      const res = await request(app)
        .post("/api/blogs")
        .send(validBlogData);

      expect(res.status).toBe(201);
      expect(res.body.data.title).toBe(validBlogData.title);
      expect(res.body.data.author).toBe(validBlogData.author);
    });

    it("should return 400 for invalid blog data", async () => {
      const invalidData = { ...validBlogData, title: "" };
      const res = await request(app)
        .post("/api/blogs")
        .send(invalidData);

      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/blogs", () => {
    it("should return all blogs", async () => {
      await Blog.create(validBlogData);
      
      const res = await request(app).get("/api/blogs");
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data.result)).toBeTruthy();
      expect(res.body.data.result.length).toBe(1);
    });
  });

  describe("GET /api/blogs/:id", () => {
    it("should return a blog by id", async () => {
      const blog = await Blog.create(validBlogData);
      
      const res = await request(app).get(`/api/blogs/${blog._id}`);
      
      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe(validBlogData.title);
    });

    it("should return 404 for non-existent blog", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/blogs/${fakeId}`);
      
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/blogs/:id", () => {
    it("should update a blog", async () => {
      const blog = await Blog.create(validBlogData);
      const updateData = { ...validBlogData, title: "Updated Title" };
      
      const res = await request(app)
        .put(`/api/blogs/${blog._id}`)
        .send(updateData);
      
      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe("Updated Title");
    });
  });

  describe("DELETE /api/blogs/:id", () => {
    it("should delete a blog", async () => {
      const blog = await Blog.create(validBlogData);
      
      const res = await request(app).delete(`/api/blogs/${blog._id}`);
      
      expect(res.status).toBe(200);
      const deletedBlog = await Blog.findById(blog._id);
      expect(deletedBlog).toBeNull();
    });
  });
});
