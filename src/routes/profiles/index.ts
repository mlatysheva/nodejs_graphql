import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createProfileBodySchema, changeProfileBodySchema } from './schema';
import type { ProfileEntity } from '../../utils/DB/entities/DBProfiles';
import { validateUuid } from '../../utils/helpers/validateUuid';
import { ErrorMessage } from '../../utils/constants/errors';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<
    ProfileEntity[]
  > {
    return await fastify.db.profiles.findMany();
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const id = request.params.id;
      // if (!validateUuid(id)) {
      //   reply.statusCode = 400;
      //   throw new Error(ErrorMessage.INVALID_ID);
      // }
      const profile = await fastify.db.profiles.findOne( { key: 'id', equals: id});
      if (!profile) {
        reply.statusCode = 404;
        throw new Error (ErrorMessage.NOT_FOUND);
      }
      return profile;
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createProfileBodySchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const profile = request.body;
      const doesExist = await fastify.db.profiles.findOne( { key: 'id', equals: request.body.userId});
      if (doesExist) {
        reply.statusCode = 400;
        throw new Error (ErrorMessage.PROFILE_EXISTS);
      };
      return await fastify.db.profiles.create(profile);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const id = request.params.id;
      // if (!validateUuid(id)) {
      //   reply.statusCode = 400;
      //   throw new Error(ErrorMessage.INVALID_ID);
      // }
      const profile = await fastify.db.profiles.findOne({ key: 'id', equals: id });
      if (!profile) {
        reply.statusCode = 404;
        throw new Error (ErrorMessage.NOT_FOUND);
      }
      return await fastify.db.profiles.delete(id);
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeProfileBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const id = request.params.id;
      if (!validateUuid(id)) {
        reply.statusCode = 400;
        throw new Error(ErrorMessage.INVALID_ID);
      }
      const profile = await fastify.db.profiles.findOne({ key: 'id', equals: id });
      if (!profile) {
        reply.statusCode = 404;
        throw new Error (ErrorMessage.NOT_FOUND);
      } 
      const updatedProfile = await fastify.db.profiles.change(id, request.body);
      return updatedProfile;
    }
  );
};

export default plugin;
