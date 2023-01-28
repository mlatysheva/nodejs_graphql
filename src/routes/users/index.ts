import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import {
  createUserBodySchema,
  changeUserBodySchema,
  subscribeBodySchema,
} from './schemas';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';
import { validateUuid } from '../../utils/helpers/validateUuid';
import { ErrorMessage } from '../../utils/constants/errors';
// import fastify from 'fastify';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (
  fastify
): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<UserEntity[]> {
    return await fastify.db.users.findMany();
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, _): Promise<UserEntity> {
      const user = await fastify.db.users.findOne({ 
        key: 'id', 
        equals: request.params.id
      });

      if (!user) {
        throw fastify.httpErrors.notFound(ErrorMessage.NOT_FOUND);
      } else {
        return user;
      }
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createUserBodySchema,
      },
    },
    async function (request, _): Promise<UserEntity> {
      return await fastify.db.users.create(request.body);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, _): Promise<UserEntity> {
      try {
				const deletedUser = await fastify.db.users.delete(request.params.id);

        const profile = await fastify.db.profiles.findOne({
					key: 'userId',
					equals: deletedUser.id,
				});

        if (profile) {
					await fastify.db.profiles.delete(profile.id);
				};

        const posts = await fastify.db.posts.findMany({
					key: 'userId',
					equals: deletedUser.id,
				});

        for (const post of posts) {
          await fastify.db.posts.delete(post.id);
        };

				const subscribedToUser = await fastify.db.users.findMany({
					key: 'subscribedToUserIds',
					equals: [deletedUser.id],
				});

        for (const subscriber of subscribedToUser) {
          await fastify.db.users.change(subscriber.id, {
            subscribedToUserIds: subscriber.subscribedToUserIds
              .filter((subscriberId) => subscriberId !== deletedUser.id),
          })
        };

				return deletedUser;
			} catch (error) {
        throw fastify.httpErrors.badRequest(ErrorMessage.BAD_REQUEST);
			}
    }
  );

  fastify.post(
    '/:id/subscribeTo',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, _): Promise<UserEntity> {
      const subscribingUser = await fastify.db.users.findOne({
				key: 'id',
				equals: request.params.id,
			});

			const userToSubscribeTo = await fastify.db.users.findOne({
				key: 'id',
				equals: request.body.userId,
			});

			if (!subscribingUser || !userToSubscribeTo) {
        throw fastify.httpErrors.notFound(ErrorMessage.NOT_FOUND);
			};

      const alreadySubscribed = subscribingUser.subscribedToUserIds
        .filter((subscriberId) => subscriberId === request.body.userId);

      if (alreadySubscribed.length > 0) {
        throw fastify.httpErrors.badRequest(ErrorMessage.USER_ALREADY_SUBSCRIBED);
      };

      const updatedSubscribedToUserIds = [...subscribingUser.subscribedToUserIds]
        .concat(userToSubscribeTo.id);

      const updatedUser = await fastify.db.users.change(request.params.id, {
              subscribedToUserIds: updatedSubscribedToUserIds,
            });

      const updatedUserToSubscribeToSubscriberIds = [...userToSubscribeTo.subscribedToUserIds]
        .concat(subscribingUser.id);			

			await fastify.db.users.change(request.body.userId, {
				subscribedToUserIds: updatedUserToSubscribeToSubscriberIds,
			});

			return updatedUser;      
    }
  );

  fastify.post(
    '/:id/unsubscribeFrom',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, _): Promise<UserEntity> {
      const unsubscribingUser = await fastify.db.users.findOne({
				key: 'id',
				equals: request.params.id,
			});

			const userToUnsubscribeFrom = await fastify.db.users.findOne({
				key: 'id',
				equals: request.body.userId,
			});

			if (!unsubscribingUser || !userToUnsubscribeFrom) {
        throw fastify.httpErrors.notFound(ErrorMessage.NOT_FOUND);
			};

      const wasSubscribed = unsubscribingUser.subscribedToUserIds
        .filter((subscriberId) => subscriberId === request.body.userId);

      const isInSubsribers = userToUnsubscribeFrom.subscribedToUserIds
        .filter((subscribedId) => subscribedId === request.params.id);

			if (wasSubscribed.length === 0 || isInSubsribers.length === 0) {
        throw fastify.httpErrors.badRequest(ErrorMessage.BAD_REQUEST);
			}

			const updatedUser = await fastify.db.users.change(request.params.id, {
				subscribedToUserIds: unsubscribingUser.subscribedToUserIds
          .filter((subscriber) => subscriber !== request.body.userId),
			});

			await fastify.db.users.change(request.body.userId, {
				subscribedToUserIds: userToUnsubscribeFrom.subscribedToUserIds
          .filter((subscriber) => subscriber !== request.params.id),
			});

			return updatedUser;
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeUserBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, _): Promise<UserEntity> {
      const id = request.params.id;
      if (!validateUuid(id)) {
        throw fastify.httpErrors.badRequest(ErrorMessage.BAD_REQUEST);
      }
      const user = await fastify.db.users.findOne({ 
        key: 'id', 
        equals: id,
      });
      if (!user) {
        throw fastify.httpErrors.notFound(ErrorMessage.NOT_FOUND);
      } else {
        return await fastify.db.users.change(id, request.body);
      }
    }
  );
};

export default plugin;
