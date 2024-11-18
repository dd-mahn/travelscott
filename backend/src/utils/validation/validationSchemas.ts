import Joi from 'joi';

export const blogSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  category: Joi.string().valid('Wilderness', 'Culture&Heritage', 'FoodLovers', 'SoloJourneys', 'CityScape', 'Season&Festival', 'Relaxation', 'FirstTimeAbroad').required(),
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
  video: Joi.string().required(),
  country: Joi.string().required(),
  places: Joi.object(),
  transportation: Joi.object(),
  insight: Joi.object(),
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
  description: Joi.array().items(Joi.string()).required(),
  images: Joi.object(),
  capital: Joi.string(),
  currency: Joi.string(),
  language: Joi.string(),
  visaRequirement: Joi.string(),
  dialInCode: Joi.string(),
  timeZone: Joi.string(),
  additionalInfo: Joi.object()
});

export const feedbackSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(0).required(),
  country: Joi.string().required(),
  message: Joi.string().required()
});

export const subscribeSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    })
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required()
});

export const authSchema = Joi.object({
  email: Joi.string().email().required()
});
