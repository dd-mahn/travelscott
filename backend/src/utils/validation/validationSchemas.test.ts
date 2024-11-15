import { blogSchema, destinationSchema, countrySchema, feedbackSchema } from 'src/utils/validation/validationSchemas';

describe('Validation Schemas', () => {
  describe('blogSchema', () => {
    it('should validate a valid blog object', () => {
      const validBlog = {
        title: 'Test Blog',
        author: 'John Doe',
        category: 'Wilderness',
        image: 'test.jpg',
        content: [{
          sectionTitle: 'Test Section',
          sectionImages: [{
            url: 'test-section.jpg',
            description: 'Test description'
          }],
          sectionText: ['Test paragraph']
        }],
        time: '5 min read',
        tags: ['nature', 'adventure'],
        related_destination: 'Test Location',
        featured: true
      };

      const { error } = blogSchema.validate(validBlog);
      expect(error).toBeUndefined();
    });

    it('should reject invalid blog category', () => {
      const invalidBlog = {
        title: 'Test Blog',
        author: 'John Doe',
        category: 'InvalidCategory',
        content: []
      };

      const { error } = blogSchema.validate(invalidBlog);
      expect(error).toBeDefined();
    });
  });

  describe('destinationSchema', () => {
    it('should validate a valid destination object', () => {
      const validDestination = {
        name: 'Test Destination',
        video: 'test-video.mp4',
        country: 'Test Country',
        places: {},
        transportation: {},
        insight: {},
        continent: 'Asia',
        location: 'Test Location',
        description: 'Test Description',
        additionalInfo: {},
        tags: ['travel', 'adventure'],
        summary: 'Test Summary',
        featured: false
      };

      const { error } = destinationSchema.validate(validDestination);
      expect(error).toBeUndefined();
    });

    it('should reject when required fields are missing', () => {
      const invalidDestination = {
        name: 'Test Destination'
      };

      const { error } = destinationSchema.validate(invalidDestination);
      expect(error).toBeDefined();
    });
  });

  describe('countrySchema', () => {
    it('should validate a valid country object', () => {
      const validCountry = {
        name: 'Test Country',
        continent: 'Europe',
        description: ['Test description paragraph'],
        images: {},
        capital: 'Test Capital',
        currency: 'TEST',
        language: 'Test Language',
        visaRequirement: 'Visa on arrival',
        dialInCode: '+123',
        timeZone: 'GMT+1',
        additionalInfo: {}
      };

      const { error } = countrySchema.validate(validCountry);
      expect(error).toBeUndefined();
    });

    it('should reject when required fields are missing', () => {
      const invalidCountry = {
        name: 'Test Country'
      };

      const { error } = countrySchema.validate(invalidCountry);
      expect(error).toBeDefined();
    });
  });

  describe('feedbackSchema', () => {
    it('should validate a valid feedback object', () => {
      const validFeedback = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        age: 25,
        country: 'Test Country',
        message: 'Test feedback message'
      };

      const { error } = feedbackSchema.validate(validFeedback);
      expect(error).toBeUndefined();
    });

    it('should reject invalid email format', () => {
      const invalidFeedback = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
        age: 25,
        country: 'Test Country',
        message: 'Test feedback message'
      };

      const { error } = feedbackSchema.validate(invalidFeedback);
      expect(error).toBeDefined();
    });

    it('should reject negative age', () => {
      const invalidFeedback = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        age: -1,
        country: 'Test Country',
        message: 'Test feedback message'
      };

      const { error } = feedbackSchema.validate(invalidFeedback);
      expect(error).toBeDefined();
    });
  });
});
