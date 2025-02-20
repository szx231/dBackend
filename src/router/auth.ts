import * as authController from '@/controllers/auth.js';
import { checkAuth } from '@/plugins/checkAuth.js';
import { FastifyInstance } from 'fastify';
import { logInSchema, registerUserSchema } from './auth.schemas.js';

export const authRouter = async (instance: FastifyInstance) => {
  instance.post('/register', { schema: { body: registerUserSchema } }, authController.register);
  instance.post('/login', { schema: { body: logInSchema } }, authController.logIn);
  instance.get('/session', { preHandler: [checkAuth] }, authController.getSession);
  instance.get('/logout', authController.logOut);
};
