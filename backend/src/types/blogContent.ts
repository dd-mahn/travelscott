type sectionImage = {
  url: string;
  description?: string;
};

interface blogContent {
  sectionTitle: string;
  sectionImages: sectionImage[];
  sectionText: string[];
}

export default blogContent;
