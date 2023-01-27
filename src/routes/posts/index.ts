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
    async function (request, reply): Promise<PostEntity> {
      const id = request.params.id;
      // if (!validateUuid(id)) {
      //   reply.statusCode = 400;
      //   throw new Error(ErrorMessage.INVALID_ID);
      // }
      const post = await fastify.db.posts.findOne({ key: 'id', equals: id});
      if (!post) {
        reply.statusCode = 404;
        throw new Error(ErrorMessage.NOT_FOUND);
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
    async function (request, reply): Promise<PostEntity> {
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
    async function (request, reply): Promise<PostEntity> {
      const id = request.params.id;
      if (!validateUuid(id)) {
        reply.statusCode = 400;
        throw new Error(ErrorMessage.INVALID_ID);
      }
      const post = await fastify.db.posts.findOne({ key: 'id', equals: id });
      if (!post) {
        reply.statusCode = 404;
        throw new Error(ErrorMessage.NOT_FOUND);
      } else {
        return await fastify.db.posts.delete(id);
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
    async function (request, reply): Promise<PostEntity> {
      const id = request.params.id;
      if (!validateUuid(id)) {
        reply.statusCode = 400;
        throw new Error(ErrorMessage.INVALID_ID);
      }
      const post = await fastify.db.posts.findOne({ key: 'id', equals: id });
      if (!post) {
        reply.statusCode = 404;
        throw new Error (ErrorMessage.NOT_FOUND);
      } 
      const updatedPost = await fastify.db.posts.change(id, request.body);
      return updatedPost;
    }
  );
};

export default plugin;
