import { describe, it, expect } from "vitest";
import reducer, {
  setAllBlogs,
  setInspirationCatalogBlogs,
  setFilteredBlogs,
  setFeaturedBlogs,
  setStarterBlogs,
  setHomeBlogs,
  setBlogChunks
} from "src/store/slices/blogSlice";
import type BlogType from "src/types/Blog";

describe("Blog Slice", () => {
  const sampleBlog: BlogType = {
    _id: "1",
    title: "Test Blog",
    content: [],
    image: "test.jpg",
    category: "Test Category",
    tags: ["test"],
    featured: false,
    author: "Test Author",
    time: "10",
    related_destination: "Test Destination"
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual({
      allBlogs: [],
      inspirationCatalogBlogs: [],
      filteredBlogs: [],
      featuredBlogs: [],
      starterBlogs: [],
      homeBlogs: [],
      blogChunks: []
    });
  });

  it("should handle setAllBlogs", () => {
    const blogs = [sampleBlog];
    const state = reducer(undefined, setAllBlogs(blogs));
    expect(state.allBlogs).toEqual(blogs);
  });

  it("should handle setInspirationCatalogBlogs", () => {
    const blogs = [sampleBlog];
    const state = reducer(undefined, setInspirationCatalogBlogs(blogs));
    expect(state.inspirationCatalogBlogs).toEqual(blogs);
  });

  it("should handle setFilteredBlogs", () => {
    const blogs = [sampleBlog];
    const state = reducer(undefined, setFilteredBlogs(blogs));
    expect(state.filteredBlogs).toEqual(blogs);
  });

  it("should handle setFeaturedBlogs", () => {
    const blogs = [sampleBlog];
    const state = reducer(undefined, setFeaturedBlogs(blogs));
    expect(state.featuredBlogs).toEqual(blogs);
  });

  it("should handle setStarterBlogs", () => {
    const blogs = [sampleBlog];
    const state = reducer(undefined, setStarterBlogs(blogs));
    expect(state.starterBlogs).toEqual(blogs);
  });

  it("should handle setHomeBlogs", () => {
    const blogs = [sampleBlog];
    const state = reducer(undefined, setHomeBlogs(blogs));
    expect(state.homeBlogs).toEqual(blogs);
  });

  it("should handle setBlogChunks", () => {
    const blogChunks = [[sampleBlog]];
    const state = reducer(undefined, setBlogChunks(blogChunks));
    expect(state.blogChunks).toEqual(blogChunks);
  });

  it("should not modify other state properties when updating one property", () => {
    const initialState = reducer(undefined, { type: "" });
    const blogs = [sampleBlog];
    
    const state = reducer(initialState, setAllBlogs(blogs));
    
    expect(state.allBlogs).toEqual(blogs);
    expect(state.inspirationCatalogBlogs).toEqual(initialState.inspirationCatalogBlogs);
    expect(state.filteredBlogs).toEqual(initialState.filteredBlogs);
    expect(state.featuredBlogs).toEqual(initialState.featuredBlogs);
    expect(state.starterBlogs).toEqual(initialState.starterBlogs);
    expect(state.homeBlogs).toEqual(initialState.homeBlogs);
    expect(state.blogChunks).toEqual(initialState.blogChunks);
  });
});
