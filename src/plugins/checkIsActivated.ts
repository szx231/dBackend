import { dbService } from '@/services/index.js';
import type { preHandlerMetaHookHandler } from 'fastify/types/hooks.js';

export const checkIsActivated: preHandlerMetaHookHandler = async (req, repl) => {
  const user = req.session.user;

  if (user) {
    const isActivated = await dbService.users.isActivated(user.id);
    console.log('IS_FUCKING_ACTIVATED', isActivated);
    if (!isActivated) {
      repl.status(403);
      throw Error('User not activated');
    }
  }
};
