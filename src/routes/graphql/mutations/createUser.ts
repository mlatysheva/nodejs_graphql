import { UserEntity } from '../../../utils/DB/entities/DBUsers';
import { createUserDTO, userDTO } from '../types/user.dto';

export const createUserMutation = {
  type: userDTO,
  args: { input: { type: createUserDTO } },
  resolve: async (_: any, { input }: Record<'input', Omit<UserEntity, 'id'>>, context: any) => {
    return await context.db.users.create(input);
  },
}
