import { EmailService } from 'src/services/EmailService';
import nodemailer from 'nodemailer';

// Mock nodemailer
jest.mock('nodemailer');

describe('EmailService', () => {
  let emailService: EmailService;
  const mockSendMail = jest.fn();

  beforeEach(() => {
    // Clear mocks between tests
    jest.clearAllMocks();

    // Setup nodemailer mock
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: mockSendMail
    });

    emailService = new EmailService();
  });

  describe('sendWelcomeEmail', () => {
    const testEmail = 'test@example.com';

    it('should send welcome email successfully', async () => {
      mockSendMail.mockResolvedValueOnce('Email sent');

      await expect(emailService.sendWelcomeEmail(testEmail)).resolves.not.toThrow();

      expect(mockSendMail).toHaveBeenCalledTimes(1);
      expect(mockSendMail).toHaveBeenCalledWith(expect.objectContaining({
        to: testEmail,
        subject: 'Welcome to TravelScott!',
        html: expect.stringContaining('Welcome to TravelScott!')
      }));
    });

    it('should throw error when email sending fails', async () => {
      const error = new Error('Failed to send email');
      mockSendMail.mockRejectedValueOnce(error);

      await expect(emailService.sendWelcomeEmail(testEmail)).rejects.toThrow(error);

      expect(mockSendMail).toHaveBeenCalledTimes(1);
    });
  });
});
