import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async sendWelcomeEmail(subscriberEmail: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: subscriberEmail,
      subject: 'Welcome to TravelScott!',
      html: `
        <h1>Welcome to TravelScott!</h1>
        <p>Thank you for subscribing to our newsletter!</p>
        <p>You'll receive updates about:</p>
        <ul>
          <li>New travel destinations</li>
          <li>Travel tips and guides</li>
          <li>Special offers</li>
        </ul>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }
  }
}