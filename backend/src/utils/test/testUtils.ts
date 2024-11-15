import { Express } from 'express';
import express from 'express';
import { setupMiddleware } from 'src/middlewares/middlewares';

export const createTestApp = (): Express => {
  const app = express();
  setupMiddleware(app);
  return app;
};

export const mockBlog = {
  title: 'Test Blog',
  author: 'John Doe',
  category: 'Travel',
  image: 'test.jpg',
  content: [
    {
      sectionTitle: 'Test Section',
      sectionImages: [
        {
          url: 'section1.jpg',
          description: 'Test description'
        }
      ],
      sectionText: ['Test paragraph']
    }
  ],
  time: '2024-01-01',
  tags: ['travel', 'adventure'],
  related_destination: 'Paris',
  featured: true
};
