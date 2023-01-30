import { GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { postDTO } from './post.dto';
import { profileDTO } from './profile.dto';
import { memberTypeDTO } from './memberType.dto';

export const shortUserDTO = new GraphQLObjectType({
	name: 'shortUserDTO',
	fields: () => ({
		id: { type: GraphQLID },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		email: { type: GraphQLString },
  })
});

export const createUserDTO = new GraphQLInputObjectType({
	name: 'createUserDTO',
	fields: {
		firstName: { type: new GraphQLNonNull(GraphQLString) },
		lastName: { type: new GraphQLNonNull(GraphQLString) },
		email: { type: new GraphQLNonNull(GraphQLString) },
	},
});

export const updateUserDTO = new GraphQLInputObjectType({
	name: 'updateUserDTO',
	fields: {
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		email: { type: GraphQLString },
	},
});

export const userDTO = new GraphQLObjectType({
	name: 'userDTO',
	fields: () => ({
		id: { type: GraphQLID },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		email: { type: GraphQLString },
		subscribedToUserIds: { type: new GraphQLList(GraphQLString) },
    posts: {
      type: new GraphQLList(postDTO),
      resolve: async (user: any, args: any, context) => {
        return await context.db.posts.findMany({key: 'userId', equals: user.id});
      }
    },
    profile: {
      type: profileDTO,
      resolve: async (user: any, args: any, context) => {
        return await context.db.profiles.findOne({key: 'userId', equals: user.id});
      }
    },
    memberType: {
      type: memberTypeDTO,
      resolve: async (user: any, args: any, context) => {
        const profile = await context.db.profiles.findOne({key: 'userId', equals: user.id});

        if (profile === null) {
          return Promise.resolve(null);
        }

        return await context.db.memberTypes.findOne({key: 'id', equals: profile.memberTypeId});
      }
    },
    userSubscribedTo: {
      type: new GraphQLList(shortUserDTO),
      resolve: async (user: any, args: any, context) => {
        return await context.db.users.findMany({key: 'subscribedToUserIds', inArray: user.id});
      }
    },
    subscribedToUser: {
      type: new GraphQLList(shortUserDTO),
      resolve: async (user: any, args: any, context) => {
        return await context.db.users.findMany({key: 'id', equalsAnyOf: user.subscribedToUserIds});
      }
    }
	}),
});



