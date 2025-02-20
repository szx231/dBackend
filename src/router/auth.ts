import * as authController from '@/controllers/auth.js';
import { FastifyInstance } from 'fastify';
import { registerUserSchema } from './auth.schemas.js';

export const authRouter = async (instance: FastifyInstance) => {
  instance.post(
    '/register',
    {
      schema: {
        body: registerUserSchema,
      },
    },
    authController.register,
  );
};
