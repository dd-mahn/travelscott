import { Request, Response } from 'express';
import Subscribe from 'src/models/Subscribe';

// Create a new subscription
export const createSubscription = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const newSubscription = new Subscribe({ email });
    await newSubscription.save();
    res.status(201).json({ message: 'Subscription created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create subscription', error });
  }
};

// Get all subscriptions
export const getSubscriptions = async (req: Request, res: Response) => {
  try {
    const subscriptions = await Subscribe.find();
    res.status(200).json(subscriptions);
  } catch (error) {
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
    res.status(500).json({ message: 'Failed to delete subscription', error });
  }
};
