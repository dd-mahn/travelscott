import express from 'express';
import { validateRequest } from 'src/utils/validation/validationMiddleware';
import { authSchema } from 'src/utils/validation/validationSchemas';
import { generateSubscriptionTokens, refreshAccessToken } from 'src/controllers/AuthControllers/AuthController';

const router = express.Router();

router.post('/tokens', validateRequest(authSchema), generateSubscriptionTokens);
router.post('/refresh', refreshAccessToken);

export default router; 