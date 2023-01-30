import { postDTO, updatePostDTO } from '../types/post.dto';
import { GraphQLID } from 'graphql';

export const updatePostMutation = {
  type: postDTO,
  args: {
    id: { type: GraphQLID },
    input: { type: updatePostDTO },    
  },
  resolve: async (_: any, args: any, context: any) => {
    return await context.db.posts.change(args.id, args.input);
  }
};