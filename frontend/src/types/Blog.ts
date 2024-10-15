// Type definition for an image in a blog section
type SectionImage = {
  url: string;
  description?: string; // Optional description for the image
};

// Interface for the content of a blog section
interface BlogContent {
  sectionTitle: string;
  sectionImages: SectionImage[];
  sectionText: string[];
}

// Interface for the Blog object
interface Blog {
  _id: string; // Unique identifier for the blog
  title: string; // Title of the blog
  author: string; // Author of the blog
  category: string; // Category of the blog
  image: string; // Main image for the blog
  content: BlogContent[]; // Array of content sections in the blog
  time: string; // Time when the blog was created or published
  tags: string[]; // Array of tags associated with the blog
  related_destination: string; // Related destination for the blog
  featured: boolean; // Flag to indicate if the blog is featured
}

export default Blog;