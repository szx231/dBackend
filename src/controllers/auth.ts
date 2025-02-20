import type { RegisterUserBody } from '@/router/auth.schemas.js';
import { dbService } from '@/services/index.js';
import { createHash } from '@/shared/utils/passwords.js';
import { type FastifyReply, type FastifyRequest } from 'fastify';

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  const userData = request.body as RegisterUserBody;
  const isExist = await dbService.users.findByEmail(userData.email);

  console.log('USER_DATA', userData);

  if (isExist) {
    reply.status(400);
    throw Error('fuck you!');
  }

  const { hash: _, ...newUser } = await dbService.users.createUser({
    email: userData.email,
    full_name: userData.fullName,
    gender: userData.gender,
    partner_gender: userData.partnerGender,
    height: userData.height,
    job_title_id: userData.jobTitleId,
    date_birth: new Date(userData.dateBirth).toISOString(),
    relation_type: userData.relationType,
    role_code: 'USER',
    hash: createHash(userData.password),
  });
  reply.status(201);

  return newUser;
};
