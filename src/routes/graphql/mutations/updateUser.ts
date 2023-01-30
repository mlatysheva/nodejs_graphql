// import { GraphQLID } from 'graphql';
// import { UserEntity } from '../../../utils/DB/entities/DBUsers';
import { updateUserDTO, userDTO } from '../types/user.dto';

export const updateUserMutation = {
  type: userDTO,
  args: {
    input: { type: updateUserDTO } 
  },
  resolve: async (_: any, args: any, context: any) => {
    try {
      return await context.db.users.change(args.input.id, args.input);
    } catch (err) {
      return err;
    };    
  },
}