import { ProfileEntity } from '../../../utils/DB/entities/DBProfiles';
import { createProfileDTO, profileDTO } from '../types/profile.dto';

export const createProfileMutation = {
  type: profileDTO,
  args: { input: { type: createProfileDTO } },
  resolve: async (_: any, { input }: Record<'input', Omit<ProfileEntity, 'id'>>, context: any) => {
    return await context.db.profiles.create(input);
  },
}