import { Router } from 'express';
import { createSubscription, getSubscriptions, getSubscriptionById, updateSubscription, deleteSubscription } from 'src/controllers/SubscribeController';

const router = Router();

router.post('/', createSubscription);
router.get('/', getSubscriptions);
router.get('/:id', getSubscriptionById);
router.put('/:id', updateSubscription);
router.delete('/:id', deleteSubscription);

export default router;
