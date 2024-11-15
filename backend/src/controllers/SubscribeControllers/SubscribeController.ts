import { Request, Response } from 'express';
import Subscribe from 'src/models/Subscribe';
import { EmailService } from 'src/services/EmailService';
import { logControllerError } from "src/utils/logger";
import { generateTokenPair } from 'src/utils/auth/jwt';

const emailService = new EmailService();

// Create a new subscription
export const createSubscription = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    // Create subscription
    const newSubscription = new Subscribe({ email });
    const savedSubscription = await newSubscription.save();
    
    // Generate JWT token
    const tokenPair = generateTokenPair({
      userId: savedSubscription._id.toString(),
      email: savedSubscription.email
    });
    
    // Send welcome email
    await emailService.sendWelcomeEmail(email);
    
    res.status(201).json({ 
      message: 'Subscription created successfully and welcome email sent',
      tokenPair
    });
  } catch (error) {
    logControllerError("createSubscription", error);
    res.status(500).json({ 
      message: 'Failed to create subscription or send welcome email', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// Get all subscriptions
export const getSubscriptions = async (req: Request, res: Response) => {
  try {
    const subscriptions = await Subscribe.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    logControllerError("getSubscriptions", error);
    res.status(500).json({ message: 'Failed to retrieve subscriptions', error });
  }
};

// Get a single subscription by ID
export const getSubscriptionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subscription = await Subscribe.findById(id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.status(200).json(subscription);
  } catch (error) {
    logControllerError("getSubscriptionById", error);
    res.status(500).json({ message: 'Failed to retrieve subscription', error });
  }
};

// Update a subscription by ID
export const updateSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const updatedSubscription = await Subscribe.findByIdAndUpdate(id, { email }, { new: true });
    if (!updatedSubscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.status(200).json({ message: 'Subscription updated successfully', updatedSubscription });
  } catch (error) {
    logControllerError("updateSubscription", error);
    res.status(500).json({ message: 'Failed to update subscription', error });
  }
};

// Delete a subscription by ID
export const deleteSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedSubscription = await Subscribe.findByIdAndDelete(id);
    if (!deletedSubscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    logControllerError("deleteSubscription", error);
    res.status(500).json({ message: 'Failed to delete subscription', error });
  }
};
