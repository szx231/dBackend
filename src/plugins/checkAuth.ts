import type { preHandlerMetaHookHandler } from 'fastify/types/hooks.js';

export const checkAuth: preHandlerMetaHookHandler = (request, reply, next) => {
  if (!request.session.user) {
    reply.status(401);
    throw Error('Not Authenticated');
  }
  return next();
};
