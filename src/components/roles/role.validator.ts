import { CommonGetListQuerySchema } from '../../constants';
import Joi from '../../plugins/joi';
import { ROLE_NAME_MAX_LENGTH } from './role.constant';

export const roleGetListQuerySchema = Joi.object().keys({
    ...CommonGetListQuerySchema,
});

export const createRoleSchema = Joi.object().keys({
    name: Joi.string().trim().max(ROLE_NAME_MAX_LENGTH).required(),
});

export const updateRoleSchema = Joi.object().keys({
    name: Joi.string().trim().max(ROLE_NAME_MAX_LENGTH).required(),
});

export const updateRolePermissionsSchema = Joi.object().keys({
    permissionIds: Joi.array().items(Joi.number()),
});
