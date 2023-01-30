import { GraphQLObjectType } from 'graphql';
import { createUserMutation } from './mutations/createUser';
import { createPostMutation } from './mutations/createPost';
import { createProfileMutation } from './mutations/createProfile';


export const RootMutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
    createUser: createUserMutation,
    createProfile: createProfileMutation,
    createPost: createPostMutation,
  }
});

// context.inject({
//   method: 'POST',
//   url: '/users',
//   payload: args,
// })

// findMany({ key: 'subscribedToUserIds', inArray: id }