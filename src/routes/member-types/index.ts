import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { changeMemberTypeBodySchema } from './schema';
import type { MemberTypeEntity } from '../../utils/DB/entities/DBMemberTypes';
import { validateUuid } from '../../utils/helpers/validateUuid';
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
    async function (request, reply): Promise<MemberTypeEntity> {
      const id = request.params.id;
      // if (!validateUuid(id)) {
      //   reply.statusCode = 400;
      //   throw new Error(ErrorMessage.INVALID_ID);
      // }
      const memberType = await fastify.db.memberTypes.findOne({ key: 'id', equals: id});
      if (!memberType) {
        reply.statusCode = 404;
        throw new Error(ErrorMessage.NOT_FOUND);
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
    async function (request, reply): Promise<MemberTypeEntity> {
      const id = request.params.id;
      if (!validateUuid(id)) {
        reply.statusCode = 400;
        throw new Error(ErrorMessage.INVALID_ID);
      }
      const memberType = await fastify.db.memberTypes.findOne({ key: 'id', equals: id });
      if (!memberType) {
        reply.statusCode = 404;
        throw new Error (ErrorMessage.NOT_FOUND);
      } 
      const updatedMemberType = await fastify.db.memberTypes.change(id, request.body);
      return updatedMemberType;
    }
  );
};

export default plugin;
