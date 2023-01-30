import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserEntity } from '../../utils/DB/entities/DBUsers';
import { userDTO } from './types/user.dto';
import { profileDTO } from './types/profile.dto';
import { ProfileEntity } from '../../utils/DB/entities/DBProfiles';
import { postDTO } from './types/post.dto';
import { PostEntity } from '../../utils/DB/entities/DBPosts';
import { memberTypeDTO } from './types/memberType.dto';
import { MemberTypeEntity } from '../../utils/DB/entities/DBMemberTypes';
import { ErrorMessage } from '../../utils/constants/errors';

export const RootQuery = new GraphQLObjectType({
	name: 'Query',
	fields: {
		users: {
			type: new GraphQLList(userDTO),
			async resolve(source, args, context): Promise<UserEntity[]> {
				return await context.db.users.findMany();
			},
		},
    
    profiles: {
			type: new GraphQLList(profileDTO),
			async resolve(source, args, context): Promise<ProfileEntity[]> {
				return await context.db.profiles.findMany();
			},
		},
    posts: {
			type: new GraphQLList(postDTO),
			async resolve(source, args, context): Promise<PostEntity[]> {
				return await context.db.posts.findMany();
			},
		},
    memberTypes: {
			type: new GraphQLList(memberTypeDTO),
			async resolve(source, args, context): Promise<MemberTypeEntity[]> {
				return await context.db.memberTypes.findMany();
			},
		},

    user: {
      type: userDTO,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, { id }, context): Promise<UserEntity> {
        const user = await context.db.users.findOne({
          key: 'id',
          equals: id,
        });

        if (!user) {
          throw context.httpErrors.notFound(ErrorMessage.NOT_FOUND);
        };
        return user;
      },
    },
    profile: {
      type: profileDTO,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, { id }, context): Promise<ProfileEntity> {
        const profile = await context.db.profiles.findOne({
          key: 'id',
          equals: id,
        });

        if (!profile) {
          throw context.httpErrors.notFound(ErrorMessage.NOT_FOUND);
        };
        return profile;
      },
    },
    post: {
      type: postDTO,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, { id }, context): Promise<PostEntity> {
        const post = await context.db.profiles.findOne({
          key: 'id',
          equals: id,
        });

        if (!post) {
          throw context.httpErrors.notFound(ErrorMessage.NOT_FOUND);
        };
        return post;
      },
    },
    memberType: {
      type: memberTypeDTO,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, { id }, context): Promise<MemberTypeEntity> {
        const memberType = await context.db.memberTypes.findOne({
          key: 'id',
          equals: id,
        });

        if (!memberType) {
          throw context.httpErrors.notFound(ErrorMessage.NOT_FOUND);
        };
        return memberType;
      },
    },
  }
});
