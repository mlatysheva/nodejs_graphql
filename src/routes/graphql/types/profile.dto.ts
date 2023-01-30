import { GraphQLID, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const profileDTO = new GraphQLObjectType({
	name: 'profileDTO',
	fields: () => ({
    id: {type: GraphQLID},
    avatar: { type: GraphQLString },
    sex: { type: GraphQLString },
    birthday: { type: GraphQLInt },
    country: { type: GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    userId: {type: GraphQLID},
    memberTypeId: {
      type: GraphQLString,
    },
	}),
});

export const createProfileDTO = new GraphQLInputObjectType({
	name: 'createProfileDTO',
	fields: {
		avatar: { type: new GraphQLNonNull(GraphQLString) },
		sex: { type: new GraphQLNonNull(GraphQLString) },
		birthday: { type: new GraphQLNonNull(GraphQLInt) },
		country: { type: new GraphQLNonNull(GraphQLString) },
		street: { type: new GraphQLNonNull(GraphQLString) },
		city: { type: new GraphQLNonNull(GraphQLString) },
		userId: { type: new GraphQLNonNull(GraphQLID) },
		memberTypeId: { type: new GraphQLNonNull(GraphQLString) },
	},
});

export const updateProfileDTO = new GraphQLInputObjectType({
	name: 'updateProfileDTO',
	fields: {
		avatar: { type: GraphQLString },
		sex: { type: GraphQLString },
		birthday: { type: GraphQLInt },
		country: { type: GraphQLString },
		street: { type: GraphQLString },
		city: { type: GraphQLString },
		userId: { type: GraphQLID },
		memberTypeId: { type: GraphQLString },
	},
});
