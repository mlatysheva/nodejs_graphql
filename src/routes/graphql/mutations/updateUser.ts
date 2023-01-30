import { shortUserDTO, updateUserDTO } from '../types/user.dto';
import { GraphQLID } from 'graphql';

export const updateUserMutation = {
  type: shortUserDTO,
  args: {
    id: { type: GraphQLID },
    input: { type: updateUserDTO },    
  },
  resolve: async (_: any, args: any, context: any) => {
    return await context.db.users.change(args.id, args.input);
  }
};