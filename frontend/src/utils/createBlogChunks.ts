import Blog from "src/types/Blog";

/**
 * Function to create chunks of blogs with one featured blog followed by three normal blogs.
 * @param {Blog[]} blogs - Array of blog objects.
 * @returns {Array} - Array of blog chunks.
 */
export function createBlogChunks(blogs: Blog[]) {
  // Separate blogs into normal and featured categories
  const normalBlogs = blogs.filter(blog => !blog.featured);
  const featuredBlogs = blogs.filter(blog => blog.featured);

  const chunks = [];
  let featuredIndex = 0;
  let normalIndex = 0;

  // Create chunks with one featured blog followed by three normal blogs
  while (featuredIndex < featuredBlogs.length && normalIndex + 2 < normalBlogs.length) {
    const chunk = [
      featuredBlogs[featuredIndex],
      ...normalBlogs.slice(normalIndex, normalIndex + 3),
    ];
    chunks.push(chunk);

    featuredIndex += 1;
    normalIndex += 3;
  }

  return chunks;
}
