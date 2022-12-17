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

module.exports = {
    Roles,
    Permissions,
};
