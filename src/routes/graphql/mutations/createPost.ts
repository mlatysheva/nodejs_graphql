import { PostEntity } from '../../../utils/DB/entities/DBPosts';
import { createPostDTO, postDTO } from '../types/post.dto';

export const createPostMutation = {
  type: postDTO,
  args: { input: { type: createPostDTO } },
  resolve: async (_: any, { input }: Record<'input', Omit<PostEntity, 'id'>>, context: any) => {
    return await context.db.posts.create(input);
  },
}