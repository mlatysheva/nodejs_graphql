import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { graphqlBodySchema } from './schema';
import { GraphQLSchema, graphql } from 'graphql';
import { RootQuery } from './RootQuery';
import { RootMutation } from './RootMutation';

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
    async function (request, _) {
      const schema: GraphQLSchema = new GraphQLSchema({
				query: RootQuery,
				mutation: RootMutation,
			});

			return await graphql({ 
        schema,
        source: String(request.body.query),
        variableValues: request.body.variables,
        contextValue: fastify,
      });
    }
  );
};

export default plugin;

// не, надо зайти в /src/routes/graphql/index.ts и там, в функции, которая обрабатывает  POST запросы на /, написать реализацию графкл (схемы, резолверы) 
// пишешь в insomnia/postman POST GraphQL запрос на адрес /graphql 

