import { GraphQLObjectType } from 'graphql';
import { createUserMutation } from './mutations/createUser';
import { createPostMutation } from './mutations/createPost';
import { createProfileMutation } from './mutations/createProfile';
import { updateUserMutation } from './mutations/updateUser';
import { updatePostMutation } from './mutations/updatePost';
import { updateProfileMutation } from './mutations/updateProfile';
import { updateMemberTypeMutation } from './mutations/updateMemberType';


export const RootMutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
    createUser: createUserMutation,
    createProfile: createProfileMutation,
    createPost: createPostMutation,
    updateUser: updateUserMutation,
    updateProfile: updateProfileMutation,
    updatePost: updatePostMutation,
    updateMemberType: updateMemberTypeMutation,
  }
});
