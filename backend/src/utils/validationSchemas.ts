import Joi from 'joi';

export const blogSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  category: Joi.string().valid('Wilderness', 'Culture&Heritage', 'Food&Drink', 'SoloJourneys', 'CityScape', 'Season&Festival', 'Relaxation', 'FirstTimeAbroad').required(),
  image: Joi.string().allow(''),
  content: Joi.array().items(Joi.object({
    sectionTitle: Joi.string().required(),
    sectionImages: Joi.array().items(Joi.object({
      url: Joi.string().required(),
      description: Joi.string().allow('')
    })),
    sectionText: Joi.array().items(Joi.string()).required()
  })),
  time: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  related_destination: Joi.string().allow(''),
  featured: Joi.boolean()
});

export const destinationSchema = Joi.object({
  name: Joi.string().required(),
  country: Joi.string().required(),
  continent: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
  additionalInfo: Joi.object(),
  tags: Joi.array().items(Joi.string()),
  summary: Joi.string(),
  featured: Joi.boolean(),
});

export const countrySchema = Joi.object({
  name: Joi.string().required(),
  continent: Joi.string().required(),
});

export const feedbackSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(0).required(),
  country: Joi.string().required(),
  message: Joi.string().required()
});

