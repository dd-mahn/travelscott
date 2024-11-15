import express from 'express';
import { refreshAccessToken } from 'src/controllers/AuthControllers/AuthController';
import { validateRequest } from 'src/utils/validation/validationMiddleware';
import { refreshTokenSchema } from 'src/utils/validation/validationSchemas';

const router = express.Router();

router.post('/refresh-token', validateRequest(refreshTokenSchema), refreshAccessToken);

export default router; 