/// <reference path="./declarations.ts" />

import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import Fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import { infoRouter } from '@/router/info.js';
import { profileRouter } from '@/router/profile.js';
import { authRouter } from './router/auth.js';

const server = Fastify({ logger: true });

server.register(fastifyCookie);
server.register(fastifySession, {
  secret: 'my_super_scrapp!!!^%^%$TFDgdfgJHJ$%GDSGJSFDOBDAFhuehrthgsFD',
  rolling: true,
  saveUninitialized: true,
  cookieName: 'sessionId',
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    secure: false,
  },
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(authRouter, { prefix: '/api/v1/auth' });
server.register(infoRouter, { prefix: '/api/v1/info' });
server.register(profileRouter, { prefix: '/api/v1/profile' });

server.listen({ port: 8090 }, (err) => {
  if (err) throw err;
  console.log('scrapplog');
});
