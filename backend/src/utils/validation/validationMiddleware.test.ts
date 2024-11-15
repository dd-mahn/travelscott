import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { validateRequest } from 'src/utils/validation/validationMiddleware';

describe('Validation Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      body: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    nextFunction = jest.fn();
  });

  it('should call next() when validation passes', () => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required()
    });

    mockRequest.body = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    const middleware = validateRequest(schema);
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

  it('should return 400 error when validation fails', () => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required()
    });

    mockRequest.body = {
      name: 'John Doe',
      email: 'invalid-email' // Invalid email format
    };

    const middleware = validateRequest(schema);
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'Validation error',
      error: expect.any(String)
    });
  });

  it('should validate empty request body against schema', () => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required()
    });

    mockRequest.body = {};

    const middleware = validateRequest(schema);
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'Validation error',
      error: expect.any(String)
    });
  });
});
