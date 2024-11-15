import { Request, Response } from 'express';
import Subscribe from 'src/models/Subscribe';
import { EmailService } from 'src/services/EmailService';
import { createSubscription, getSubscriptions, getSubscriptionById, updateSubscription, deleteSubscription } from 'src/controllers/SubscribeControllers/SubscribeController';

// Mock dependencies
jest.mock('src/models/Subscribe');
jest.mock('src/services/EmailService');
jest.mock('src/utils/logger', () => ({
  default: {
    error: jest.fn(),
    info: jest.fn()
  },
  logControllerError: jest.fn()
}));

describe('SubscribeController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('createSubscription', () => {
    it('should create subscription and send welcome email successfully', async () => {
      const subscriptionData = {
        email: 'test@example.com'
      };

      mockRequest.body = subscriptionData;
      const mockSavedSubscription = { _id: '1', ...subscriptionData };
      const saveMock = jest.fn().mockResolvedValue(mockSavedSubscription);

      const subscriptionInstance = { ...mockSavedSubscription };
      Object.defineProperty(subscriptionInstance, 'save', {
        value: saveMock,
        enumerable: false
      });

      (Subscribe as unknown as jest.Mock).mockImplementation(() => subscriptionInstance);
      (EmailService.prototype.sendWelcomeEmail as jest.Mock).mockResolvedValue(undefined);

      await createSubscription(mockRequest as Request, mockResponse as Response);

      expect(Subscribe).toHaveBeenCalledWith(subscriptionData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Subscription created successfully and welcome email sent'
      });
    });

    it('should handle errors when creating subscription', async () => {
      const error = new Error('Database error');
      mockRequest.body = { email: 'test@example.com' };
      (Subscribe as unknown as jest.Mock).mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(error)
      }));

      await createSubscription(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Failed to create subscription or send welcome email',
        error: error.message
      });
    });
  });

  describe('getSubscriptions', () => {
    it('should get all subscriptions successfully', async () => {
      const mockSubscriptions = [
        { _id: '1', email: 'test1@example.com' },
        { _id: '2', email: 'test2@example.com' }
      ];

      (Subscribe.find as jest.Mock).mockResolvedValue(mockSubscriptions);

      await getSubscriptions(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockSubscriptions);
    });
  });

  describe('getSubscriptionById', () => {
    it('should get a subscription by id', async () => {
      const mockSubscription = { _id: '123', email: 'test@example.com' };
      mockRequest.params = { id: '123' };

      (Subscribe.findById as jest.Mock).mockResolvedValue(mockSubscription);

      await getSubscriptionById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockSubscription);
    });

    it('should handle non-existent subscription', async () => {
      mockRequest.params = { id: 'nonexistent' };
      (Subscribe.findById as jest.Mock).mockResolvedValue(null);

      await getSubscriptionById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Subscription not found' });
    });
  });

  describe('updateSubscription', () => {
    it('should update a subscription successfully', async () => {
      const updateData = { email: 'updated@example.com' };
      const updatedSubscription = { _id: '123', ...updateData };
      mockRequest.params = { id: '123' };
      mockRequest.body = updateData;

      (Subscribe.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedSubscription);

      await updateSubscription(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Subscription updated successfully',
        updatedSubscription
      });
    });
  });

  describe('deleteSubscription', () => {
    it('should delete a subscription successfully', async () => {
      const mockSubscription = { _id: '123', email: 'test@example.com' };
      mockRequest.params = { id: '123' };

      (Subscribe.findByIdAndDelete as jest.Mock).mockResolvedValue(mockSubscription);

      await deleteSubscription(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Subscription deleted successfully' });
    });
  });
});
