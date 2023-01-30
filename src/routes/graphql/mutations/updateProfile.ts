import { FastifyInstance } from 'fastify';
import { profileDTO, updateProfileDTO } from '../types/profile.dto';
import { GraphQLID } from 'graphql';
import { ErrorMessage } from '../../../utils/constants/errors';

export const updateProfileMutation = {
  type: profileDTO,
  args: {
    id: { type: GraphQLID },
    input: { type: updateProfileDTO },    
  },
  resolve: async (_: any, args: any, context: FastifyInstance) => {
    const profile = await context.db.profiles.findOne({key: 'id', equals: args.id});

    if (!profile) {
      throw context.httpErrors.notFound(ErrorMessage.NOT_FOUND);
    }
    return await context.db.profiles.change(args.id, args.input);
  }
};