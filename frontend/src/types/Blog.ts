type sectionImage = {
  url: string;
  description?: string;
};

interface blogContent {
  sectionTitle: string;
  sectionImages: sectionImage[];
  sectionText: string[];
}

interface Blog {
  title: string;
  author: string;
  category: string;
  image: string;
  content: blogContent[];
  time: string;
  tags: string[];
  related_destination: string;
  featured: boolean;
}

export default Blog