import { describe, it, expect } from "vitest";
import { createBlogChunks } from "src/utils/createBlogChunks";
import Blog from "src/types/Blog";

describe("createBlogChunks", () => {
  const sampleBlog: Blog = {
    _id: "1",
    title: "Sample Blog",
    content: [{ sectionTitle: "Sample content", sectionImages: [], sectionText: [] }],
    author: "John Doe",
    category: "Travel",
    time: new Date().toISOString(),
    tags: ["travel"],
    related_destination: "Sample Destination",
    featured: false,
    image: "sample.jpg"
  };

  const sampleFeaturedBlog: Blog = {
    ...sampleBlog,
    _id: "2", 
    featured: true
  };

  it("should return empty array when no blogs provided", () => {
    const result = createBlogChunks([]);
    expect(result).toEqual([]);
  });

  it("should create chunks with one featured blog followed by three normal blogs", () => {
    const blogs = [
      sampleFeaturedBlog,
      { ...sampleBlog, _id: "3" },
      { ...sampleBlog, _id: "4" },
      { ...sampleBlog, _id: "5" },
      { ...sampleFeaturedBlog, _id: "6" },
      { ...sampleBlog, _id: "7" },
      { ...sampleBlog, _id: "8" },
      { ...sampleBlog, _id: "9" }
    ];

    const result = createBlogChunks(blogs);

    expect(result).toHaveLength(2);
    expect(result[0]).toHaveLength(4);
    expect(result[1]).toHaveLength(4);

    // First chunk
    expect(result[0][0].featured).toBe(true);
    expect(result[0][1].featured).toBe(false);
    expect(result[0][2].featured).toBe(false);
    expect(result[0][3].featured).toBe(false);

    // Second chunk  
    expect(result[1][0].featured).toBe(true);
    expect(result[1][1].featured).toBe(false);
    expect(result[1][2].featured).toBe(false);
    expect(result[1][3].featured).toBe(false);
  });

  it("should not create incomplete chunks", () => {
    const blogs = [
      sampleFeaturedBlog,
      { ...sampleBlog, _id: "3" },
      { ...sampleBlog, _id: "4" },
      { ...sampleFeaturedBlog, _id: "5" },
      { ...sampleBlog, _id: "6" }
    ];

    const result = createBlogChunks(blogs);

    expect(result).toHaveLength(1);
    expect(result[0]).toHaveLength(4);
  });

  it("should handle case with more featured blogs than needed", () => {
    const blogs = [
      sampleFeaturedBlog,
      { ...sampleFeaturedBlog, _id: "3" },
      { ...sampleBlog, _id: "4" },
      { ...sampleBlog, _id: "5" },
      { ...sampleBlog, _id: "6" }
    ];

    const result = createBlogChunks(blogs);

    expect(result).toHaveLength(1);
    expect(result[0][0].featured).toBe(true);
    expect(result[0].slice(1).every(blog => !blog.featured)).toBe(true);
  });
});
