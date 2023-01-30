import { GraphQLObjectType } from 'graphql';
import { createUserMutation } from './mutations/createUser';
import { createPostMutation } from './mutations/createPost';
import { createProfileMutation } from './mutations/createProfile';
import { updateUserMutation } from './mutations/updateUser';


export const RootMutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
    createUser: createUserMutation,
    createProfile: createProfileMutation,
    createPost: createPostMutation,
    updateUser: updateUserMutation,
  }
});

// context.inject({
//   method: 'POST',
//   url: '/users',
//   payload: args,
// })

// findMany({ key: 'subscribedToUserIds', inArray: id }