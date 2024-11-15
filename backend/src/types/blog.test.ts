import mongoose from "mongoose";
import Blog, { IBlog } from "src/models/Blog";
import { getCurrentDate } from "src/utils/getCurrentDate";

describe("Blog Model Test", () => {
  it("create & save blog successfully", async () => {
    const validBlog: IBlog = new Blog({
      title: "Test Blog",
      author: "John Doe",
      category: "Wilderness",
      image: "test.jpg",
      content: [{ sectionTitle: "Introduction", sectionImages: [{ url: "image1.jpg" }], sectionText: ["This is a test blog content"] }],
      time: getCurrentDate(),
      tags: ["test", "blog"],
      related_destination: "Test Destination",
      featured: true,
    });
    const savedBlog = await validBlog.save();

    expect(savedBlog._id).toBeDefined();
    expect(savedBlog.title).toBe(validBlog.title);
    expect(savedBlog.author).toBe(validBlog.author);
    expect(savedBlog.category).toBe(validBlog.category);
    expect(savedBlog.image).toBe(validBlog.image);
    expect(savedBlog.content).toEqual(validBlog.content);
    expect(savedBlog.time).toBe(validBlog.time);
    expect(savedBlog.tags).toEqual(validBlog.tags);
    expect(savedBlog.related_destination).toBe(validBlog.related_destination);
    expect(savedBlog.featured).toBe(validBlog.featured);
  });

  it("insert blog successfully, but the field not defined in schema should be undefined", async () => {
    const blogWithInvalidField: IBlog = new Blog({
      title: "Test Blog",
      author: "John Doe",
      category: "Wilderness",
      image: "test.jpg",
      content: [{ sectionTitle: "Introduction", sectionImages: [{ url: "image1.jpg" }], sectionText: ["This is a test blog content"] }],
      time: getCurrentDate(),
      tags: ["test", "blog"],
      related_destination: "Test Destination",
      featured: true,
      extraField: "This field is not defined in schema",
    });
    const savedBlog = await blogWithInvalidField.save();
    expect(savedBlog._id).toBeDefined();
    expect((savedBlog as any).extraField).toBeUndefined();
  });

  it("create blog without required field should fail", async () => {
    const blogWithoutRequiredField: IBlog = new Blog({
      author: "John Doe",
      category: "Wilderness",
    });
    let err;
    try {
      await blogWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.title).toBeDefined();
  });
});
