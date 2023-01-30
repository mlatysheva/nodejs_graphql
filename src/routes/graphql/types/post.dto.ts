import { GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const postDTO = new GraphQLObjectType({
	name: 'postDTO',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		content: { type: GraphQLString },
		userId: { type: GraphQLID },
	}),
});

export const createPostDTO = new GraphQLInputObjectType({
	name: 'createPostDTO',
	fields: {
		title: { type: new GraphQLNonNull(GraphQLString) },
		content: { type: new GraphQLNonNull(GraphQLString) },
		userId: { type: new GraphQLNonNull(GraphQLID) },
	},
});

export const updatePostDTO = new GraphQLInputObjectType({
	name: 'updatePostDTO',
	fields: {
    id: { type: new GraphQLNonNull(GraphQLID)},
		title: { type: GraphQLString },
		content: { type: GraphQLString },
		userId: { type: GraphQLID },
	},
});