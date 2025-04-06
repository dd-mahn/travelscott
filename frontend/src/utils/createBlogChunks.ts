import Blog from "src/types/Blog";

/**
 * Function to create chunks of blogs with one featured blog followed by three normal blogs.
 * If there are not enough featured blogs, it will use normal blogs as featured.
 * @param {Blog[]} blogs - Array of blog objects.
 * @returns {Array} - Array of blog chunks.
 */
export function createBlogChunks(blogs: Blog[]) {
  if (!blogs || blogs.length === 0) {
    return [];
  }

  // Make a copy to avoid mutating the original array
  const blogsCopy = [...blogs];
  
  // Separate blogs into normal and featured categories
  let normalBlogs = blogsCopy.filter(blog => !blog.featured && blog.image);
  let featuredBlogs = blogsCopy.filter(blog => blog.featured && blog.image);

  // If no featured blogs are available, use normal blogs as featured
  if (featuredBlogs.length === 0) {
    // Move blogs with images to featured if no featured blogs exist
    featuredBlogs = normalBlogs.splice(0, Math.min(4, normalBlogs.length));
  }

  // If not enough normal blogs, add any remaining blogs regardless of featured status
  if (normalBlogs.length < 3 && blogsCopy.length > 0) {
    const remainingBlogs = blogsCopy.filter(blog => 
      !featuredBlogs.includes(blog) && !normalBlogs.includes(blog) && blog.image
    );
    normalBlogs = [...normalBlogs, ...remainingBlogs];
  }

  const chunks = [];
  let featuredIndex = 0;
  let normalIndex = 0;

  // Create chunks with one featured blog followed by three normal blogs
  while (featuredIndex < featuredBlogs.length) {
    const remainingNormalBlogs = normalBlogs.slice(normalIndex, normalIndex + 3);
    
    // Only create a chunk if we have at least one blog (the featured one)
    if (featuredBlogs[featuredIndex]) {
      const chunk = [
        featuredBlogs[featuredIndex],
        ...remainingNormalBlogs,
      ];
      chunks.push(chunk);
    }

    featuredIndex += 1;
    normalIndex += 3;
    
    // Break if we've used all normal blogs and featured blogs
    if (normalIndex >= normalBlogs.length && featuredIndex >= featuredBlogs.length) {
      break;
    }
  }

  // Log chunks for debugging
  console.log("Created chunks:", {
    total: chunks.length,
    featuredUsed: featuredIndex,
    normalUsed: normalIndex,
    originalBlogsLength: blogs.length
  });

  return chunks;
}
