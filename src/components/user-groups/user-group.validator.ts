import { CommonGetListQuerySchema } from '../../constants';
import Joi from '../../plugins/joi';
import { USER_GROUP_NAME_MAX_LENGTH } from './user-group.constant';

export const userGroupGetListQuerySchema = Joi.object().keys({
    ...CommonGetListQuerySchema,
    orderBy: Joi.string().valid('id', 'name').optional(),
});

export const createUserGroupSchema = Joi.object().keys({
    name: Joi.string().trim().max(USER_GROUP_NAME_MAX_LENGTH).required(),
    managerId: Joi.number().optional(),
});

export const updateUserGroupSchema = Joi.object().keys({
    name: Joi.string().trim().max(USER_GROUP_NAME_MAX_LENGTH).optional(),
    managerId: Joi.number().optional(),
});

export const updateUserGroupUsersSchema = Joi.object().keys({
    userIds: Joi.array().items(Joi.number()),
});
