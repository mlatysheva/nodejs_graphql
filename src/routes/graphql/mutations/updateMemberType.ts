import { memberTypeDTO, updateMemberTypeDTO } from '../types/memberType.dto';
import { GraphQLString } from 'graphql';

export const updateMemberTypeMutation = {
  type: memberTypeDTO,
  args: {
    id: { type: GraphQLString },
    input: { type: updateMemberTypeDTO },    
  },
  resolve: async (_: any, args: any, context: any) => {
    return await context.db.memberTypes.change(args.id, args.input);
  }
};