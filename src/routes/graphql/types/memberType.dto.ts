import { GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const memberTypeDTO = new GraphQLObjectType({
	name: 'memberTypeDTO',
	fields: () => ({
		id: { type: GraphQLString },
		discount: { type: GraphQLInt },
		monthPostsLimit: { type: GraphQLInt },
	}),
});

export const createMemberTypeDTO = new GraphQLInputObjectType({
	name: 'createMemberTypeDTO',
	fields: {
		discount: { type: new GraphQLNonNull(GraphQLInt) },
		monthPostsLimit: { type: new GraphQLNonNull(GraphQLInt) },
	},
});

export const updateMemberTypeDTO = new GraphQLInputObjectType({
	name: 'updateMemberTypeDTO',
	fields: {
		discount: { type: GraphQLInt },
		monthPostsLimit: { type: GraphQLInt },
	},
});