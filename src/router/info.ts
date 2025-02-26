import * as infoController from '@/controllers/info.js';
import type { FastifyInstance } from 'fastify';

export const infoRouter = (instance: FastifyInstance) => {
  instance.get('/interests', infoController.getInterests);
};
