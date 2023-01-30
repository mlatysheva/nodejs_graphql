import { GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const userDTO = new GraphQLObjectType({
	name: 'userDTO',
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
    id: { type: new GraphQLNonNull(GraphQLID)},
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		email: { type: GraphQLString },
	},
});

