import { GraphQLID, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export const memberTypeDTO = new GraphQLObjectType({
	name: 'memberTypeDTO',
	fields: () => ({
		id: { type: GraphQLID },
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
    id: { type: new GraphQLNonNull(GraphQLID)},
		discount: { type: GraphQLInt },
		monthPostsLimit: { type: GraphQLInt },
	},
});