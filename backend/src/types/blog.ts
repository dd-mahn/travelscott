type sectionImage = {
  url: string;
  description?: string;
};

export interface blogContent {
  sectionTitle: string;
  sectionImages: sectionImage[];
  sectionText: string[];
}

export interface updateData {
  title: string;
  author: string;
  content: blogContent[];
}

export interface IBlog {
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