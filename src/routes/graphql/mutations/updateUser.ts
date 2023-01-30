import { FastifyInstance } from 'fastify';
import { shortUserDTO, updateUserDTO } from '../types/user.dto';
import { GraphQLID } from 'graphql';
import { ErrorMessage } from '../../../utils/constants/errors';

export const updateUserMutation = {
  type: shortUserDTO,
  args: {
    id: { type: GraphQLID },
    input: { type: updateUserDTO },    
  },
  resolve: async (_: any, args: any, context: FastifyInstance) => {
    const user = await context.db.users.findOne({key: 'id', equals: args.id});

    if (!user) {
      throw context.httpErrors.notFound(ErrorMessage.NOT_FOUND);
    }
    return await context.db.users.change(args.id, args.input);
  }
};