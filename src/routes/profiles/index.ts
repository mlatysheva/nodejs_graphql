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
    async function (request, _): Promise<ProfileEntity> {
      const profile = await fastify.db.profiles.findOne({ 
        key: 'id',
        equals: request.params.id,
      });
      if (!profile) {
        throw fastify.httpErrors.notFound(ErrorMessage.NOT_FOUND);
      };

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
    async function (request, _): Promise<ProfileEntity> {
      const user = await fastify.db.users.findOne({
        key: 'id',
        equals: request.body.userId,
      });
      if (!user) {
        throw fastify.httpErrors.notFound(ErrorMessage.NOT_FOUND);
      };

      const profileExists = await fastify.db.profiles.findOne({ 
        key: 'userId',
        equals: request.body.userId
      });
      if (profileExists) {
        throw fastify.httpErrors.badRequest(ErrorMessage.PROFILE_EXISTS);
      };
      
      const profile = await fastify.db.profiles.create(request.body);

      const memberTypes = ['basic', 'business'];

      if (!memberTypes.includes(profile.memberTypeId)) {
        throw fastify.httpErrors.badRequest(ErrorMessage.INVALID_MEMBER_TYPE);
      };

      return profile;
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, _): Promise<ProfileEntity> {
      if (!validateUuid(request.params.id)) {
        throw fastify.httpErrors.badRequest(ErrorMessage.BAD_REQUEST);
      }

      const profile = await fastify.db.profiles.findOne({
        key: 'id',
        equals: request.params.id
      });
      if (!profile) {
        throw fastify.httpErrors.notFound(ErrorMessage.NOT_FOUND);
      };

      return await fastify.db.profiles.delete(request.params.id);
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
    async function (request, _): Promise<ProfileEntity> {
      try {
				const updatedProfile = await fastify.db.profiles.change(
					request.params.id,
					request.body
				);

				return updatedProfile;
			} catch (error) {
        throw fastify.httpErrors.badRequest(ErrorMessage.BAD_REQUEST);
			} 
    }
  );
};

export default plugin;
