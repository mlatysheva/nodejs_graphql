import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import {
  createUserBodySchema,
  changeUserBodySchema,
  // subscribeBodySchema,
} from './schemas';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';
import { validateUuid } from '../../utils/helpers/validateUuid';
import { ErrorMessage } from '../../utils/constants/errors';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<UserEntity[]> {
    return await fastify.db.users.findMany();
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const id = request.params.id;
      // if (!validateUuid(id)) {
      //   reply.statusCode = 400;
      //   throw new Error(ErrorMessage.INVALID_ID);
      // }
      const user = await fastify.db.users.findOne({ key: 'id', equals: id});
      if (!user) {
        reply.statusCode = 404;
        throw new Error(ErrorMessage.NOT_FOUND);
      } else {
        return user;
      }
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createUserBodySchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const user = request.body;
      return await fastify.db.users.create(user);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const id = request.params.id;
      // if (!validateUuid(id)) {
      //   reply.statusCode = 400;
      //   throw new Error(ErrorMessage.INVALID_ID);
      // }
      const user = await fastify.db.users.findOne({ key: 'id', equals: id });
      if (!user) {
        throw new Error(ErrorMessage.NOT_FOUND);
      } else {
        return await fastify.db.users.delete(request.params.id);
      }
    }
  );

  // fastify.post(
  //   '/:id/subscribeTo',
  //   {
  //     schema: {
  //       body: subscribeBodySchema,
  //       params: idParamSchema,
  //     },
  //   },
  //   async function (request, reply): Promise<UserEntity> {
      
  //   }
  // );

  // fastify.post(
  //   '/:id/unsubscribeFrom',
  //   {
  //     schema: {
  //       body: subscribeBodySchema,
  //       params: idParamSchema,
  //     },
  //   },
  //   async function (request, reply): Promise<UserEntity> {}
  // );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeUserBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const id = request.params.id;
      if (!validateUuid(id)) {
        reply.statusCode = 400;
        throw new Error(ErrorMessage.INVALID_ID);
      }
      const user = await fastify.db.users.findOne({ key: 'id', equals: id });
      if (!user) {
        throw new Error (ErrorMessage.NOT_FOUND);
      } else {
        const updatedUser = await fastify.db.users.change(request.params.id, request.body);
        return updatedUser;
      }
    }
  );
};

export default plugin;
