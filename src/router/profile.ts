import * as profileController from '@/controllers/profile.js';
import { checkAuth } from '@/plugins/checkAuth.js';
import { checkForBaseRights } from '@/plugins/checkForBaseRights.js';
import { updateInterestsSchema } from '@/router/profile.schemas.js';
import type { FastifyInstance } from 'fastify';

export const profileRouter = (instance: FastifyInstance) => {
  instance.addHook('preHandler', checkAuth);
  instance.addHook('preHandler', checkForBaseRights);

  instance.put('/interests', { schema: { body: updateInterestsSchema } }, profileController.updateInterests);
};
