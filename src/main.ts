import Fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { authRouter } from './router/auth.js';

const server = Fastify({ logger: true });

// server.setValidatorCompiler(validatorCompiler);
// server.setSerializerCompiler(serializerCompiler);

server.setValidatorCompiler((data) => false);

server.register(authRouter, { prefix: '/api/v1/auth' });

server.listen({ port: 8080 }, (err) => {
  if (err) throw err;
  console.log('scrapplog');
});
