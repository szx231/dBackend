import type { UpdateInterestsBody } from '@/router/profile.schemas.js';
import { dbService } from '@/services/index.js';
import type { FastifyRequest } from 'fastify';

export const updateInterests = async (request: FastifyRequest) => {
  const interests = request.body as UpdateInterestsBody;
  const user = request.session.user;

  const result = await dbService.users.updateInterests({ userId: user.id, interests });
  return result;
};
