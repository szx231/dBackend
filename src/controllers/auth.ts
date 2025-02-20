import type { LogInBody, RegisterUserBody } from '@/router/auth.schemas.js';
import { dbService } from '@/services/index.js';
import { compareHashes, createHash } from '@/shared/utils/passwords.js';
import { type FastifyReply, type FastifyRequest } from 'fastify';

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  const userData = request.body as RegisterUserBody;
  const isExist = await dbService.users.findByEmail(userData.email);

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

export const logIn = async (request: FastifyRequest, reply: FastifyReply) => {
  const credentials = request.body as LogInBody;
  const inBaseUser = await dbService.users.findByEmail(credentials.email);

  if (inBaseUser && inBaseUser.hash) {
    const checkResult = compareHashes(credentials.password, inBaseUser.hash);
    if (checkResult) {
      request.session.set('user', inBaseUser);

      const { hash: _, ...userData } = inBaseUser;
      return userData;
    }
  }

  reply.status(401);
  throw Error('Invalid credentials');
};

export const getSession = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.session.user;

  if (!user) {
    reply.status(401);
    throw Error('Not authenticated');
  }

  return user;
};

export const logOut = (request: FastifyRequest) => {
  request.session.destroy();
  return { status: 'done' };
};
