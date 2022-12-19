import { CommonGetListQuerySchema } from '../../constants';
import Joi from '../../plugins/joi';
import { ROLE_GROUP_NAME_MAX_LENGTH } from './role-group.constant';

export const roleGroupGetListQuerySchema = Joi.object().keys({
    ...CommonGetListQuerySchema,
    orderBy: Joi.string().valid('id', 'name').optional(),
});

export const createRoleGroupSchema = Joi.object().keys({
    name: Joi.string().trim().max(ROLE_GROUP_NAME_MAX_LENGTH).required(),
});

export const updateRoleGroupSchema = Joi.object().keys({
    name: Joi.string().trim().max(ROLE_GROUP_NAME_MAX_LENGTH).required(),
});

export const updateRoleGroupRolesSchema = Joi.object().keys({
    roleIds: Joi.array().items(Joi.number()),
});
