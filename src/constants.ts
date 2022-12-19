import Joi from './plugins/joi';

export enum Roles {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export enum Permissions {
    // User
    CREATE_USER = 'CREATE_USER',
    READ_USER = 'READ_USER',
    UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE',
    CHANGE_PASSWORD = 'CHANGE_PASSWORD',
    CHANGE_USER_ROLES = 'CHANGE_USER_ROLES',
    DELETE_USER = 'DELETE_USER',

    // Role
    CREATE_ROLE = 'CREATE_ROLE',
    READ_ROLE = 'READ_ROLE',
    UPDATE_ROLE = 'UPDATE_ROLE',
    DELETE_ROLE = 'DELETE_ROLE',

    // Role Group
    CREATE_ROLE_GROUP = 'CREATE_ROLE_GROUP',
    READ_ROLE_GROUP = 'READ_ROLE_GROUP',
    UPDATE_ROLE_GROUP = 'UPDATE_ROLE_GROUP',
    DELETE_ROLE_GROUP = 'DELETE_ROLE_GROUP',
}

export enum OrderDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum OrderBy {
    ID = 'id',
}

export const DEFAULT_PAGE_VALUE = 1;
export const DEFAULT_PAGE_LIMIT = 10;
export const DEFAULT_ORDER_BY = OrderBy.ID;
export const DEFAULT_ORDER_DIRECTION = OrderDirection.DESC;

export const Regex = {
    EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{1,255}$/,
};

export const MIN_PAGE_VALUE = 1;
export const MIN_PAGE_LIMIT = 1;

export const CommonGetListQuerySchema = {
    page: Joi.number().min(MIN_PAGE_VALUE).optional().allow(null),
    limit: Joi.number().min(MIN_PAGE_LIMIT).optional().allow(null),
    keyword: Joi.string().optional().allow(null, ''),
    orderDirection: Joi.string()
        .valid(...Object.values(OrderDirection))
        .optional(),
    orderBy: Joi.string()
        .valid(...Object.values(OrderBy))
        .optional(),
};
