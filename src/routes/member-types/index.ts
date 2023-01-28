import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { changeMemberTypeBodySchema } from './schema';
import type { MemberTypeEntity } from '../../utils/DB/entities/DBMemberTypes';
import { ErrorMessage } from '../../utils/constants/errors';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<
    MemberTypeEntity[]
  > {
    return await fastify.db.memberTypes.findMany();
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, _): Promise<MemberTypeEntity> {
      const id = request.params.id;
      const memberType = await fastify.db.memberTypes.findOne({ key: 'id', equals: id});
      if (!memberType) {
        throw fastify.httpErrors.notFound(ErrorMessage.MEMBER_NOT_FOUND);
      }
      return memberType;      
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeMemberTypeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, _): Promise<MemberTypeEntity> {   
      try {
				const updatedMemberType = await fastify.db.memberTypes.change(
					request.params.id,
					request.body
				);
				return updatedMemberType;
			} catch (error) {
        throw fastify.httpErrors.badRequest(ErrorMessage.BAD_REQUEST);
			} 
    }
  );
};

export default plugin;
