import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createPostBodySchema, changePostBodySchema } from './schema';
import type { PostEntity } from '../../utils/DB/entities/DBPosts';
import { validateUuid } from '../../utils/helpers/validateUuid';
import { ErrorMessage } from '../../utils/constants/errors';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<PostEntity[]> {
    return await fastify.db.posts.findMany();
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, _): Promise<PostEntity> {
      const post = await fastify.db.posts.findOne({
        key: 'id',
        equals: request.params.id,
      });
      if (!post) {
        throw fastify.httpErrors.notFound(ErrorMessage.NOT_FOUND);
      } else {
        return post;
      }
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createPostBodySchema,
      },
    },
    async function (request, _): Promise<PostEntity> {
      const post = request.body;
      return await fastify.db.posts.create(post);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, _): Promise<PostEntity> {
      if (!validateUuid(request.params.id)) {
        throw fastify.httpErrors.badRequest(ErrorMessage.BAD_REQUEST);
      }
      const post = await fastify.db.posts.findOne({
        key: 'id',
        equals: request.params.id,
      });
      if (!post) {
        throw fastify.httpErrors.notFound(ErrorMessage.NOT_FOUND);
      } else {
        return await fastify.db.posts.delete(request.params.id);
      }
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changePostBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, _): Promise<PostEntity> {
      if (!validateUuid(request.params.id)) {
        throw fastify.httpErrors.badRequest(ErrorMessage.BAD_REQUEST);
      };

      const post = await fastify.db.posts.findOne({
        key: 'id',
        equals: request.params.id,
      });
      if (!post) {
        throw fastify.httpErrors.notFound(ErrorMessage.NOT_FOUND);
      };

      return await fastify.db.posts.change(request.params.id, request.body);
    }
  );
};

export default plugin;
