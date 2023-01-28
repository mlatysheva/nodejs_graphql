import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { graphqlBodySchema } from './schema';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.post(
    '/',
    {
      schema: {
        body: graphqlBodySchema,
      },
    },
    async function (request, reply) {}
  );
};

export default plugin;

// не, надо зайти в /src/routes/graphql/index.ts и там, в функции, которая обрабатывает  POST запросы на /, написать реализацию графкл (схемы, резолверы) 
// пишешь в insomnia/postman POST GraphQL запрос на адрес /graphql 

