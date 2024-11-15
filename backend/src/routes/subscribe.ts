import express from 'express';
import { validateRequest } from 'src/utils/validation/validationMiddleware';
import { subscribeSchema } from 'src/utils/validation/validationSchemas';
import { authenticateToken } from 'src/middlewares/authMiddleware';
import {
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription
} from 'src/controllers/SubscribeControllers/SubscribeController';

const router = express.Router();

router.post('/', validateRequest(subscribeSchema), createSubscription);
router.get('/', authenticateToken, getSubscriptions);
router.get('/:id', authenticateToken, getSubscriptionById);
router.put('/:id', authenticateToken, validateRequest(subscribeSchema), updateSubscription);
router.delete('/:id', authenticateToken, deleteSubscription);

export default router;
