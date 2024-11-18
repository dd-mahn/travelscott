import express from 'express';
import { validateRequest } from 'src/utils/validation/validationMiddleware';
import { subscribeSchema } from 'src/utils/validation/validationSchemas';
import {
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
} from 'src/controllers/SubscribeControllers/SubscribeController';

const router = express.Router();

// All endpoints public, protected by email verification instead
router.post('/', validateRequest(subscribeSchema), createSubscription);
router.get('/', getSubscriptions);
router.get('/:id', getSubscriptionById);
router.put('/:id', validateRequest(subscribeSchema), updateSubscription);
router.delete('/:id', deleteSubscription);

export default router;
