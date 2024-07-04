interface Blog {
  title: string;
  author: string;
  category: string;
  image: string;
  content: Array<{
    sectionTitle: string;
    sectionImages: string[];
    sectionText: string[];
  }>;
  time: string;
  featured: boolean;
}

export default Blog