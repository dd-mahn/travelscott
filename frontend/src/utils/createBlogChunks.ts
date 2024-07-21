import Blog from "src/types/Blog";

export function createBlogChunks(blogs: Blog[]) {
  const normalBlogs = blogs.filter(
    (blog) => blog.featured === false,
  );
  const featuredBlogs = blogs.filter(
    (blog) => blog.featured === true,
  );

  const chunks = [];
  let featuredIndex = 0;
  let normalIndex = 0;

  while (
    featuredIndex < featuredBlogs.length &&
    normalIndex + 2 < normalBlogs.length
  ) {
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
