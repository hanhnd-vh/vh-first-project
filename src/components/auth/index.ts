import { Router } from 'express';
import { validateBody } from '../../middlewares/validator.middleware';
import { loginController, registerController } from './auth.controller';
import { loginSchema, registerSchema } from './auth.validator';

const authRouter = Router();

authRouter.post('/login', validateBody(loginSchema), loginController);
authRouter.post('/register', validateBody(registerSchema), registerController);

export default authRouter;
