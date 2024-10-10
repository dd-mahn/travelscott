import { Router } from 'express';
import { createSubscription, getSubscriptions, getSubscriptionById, updateSubscription, deleteSubscription } from 'src/controllers/SubscribeController';

const router = Router();

router.post('/subscribe', createSubscription);
router.get('/subscribe', getSubscriptions);
router.get('/subscribe/:id', getSubscriptionById);
router.put('/subscribe/:id', updateSubscription);
router.delete('/subscribe/:id', deleteSubscription);

export default router;
