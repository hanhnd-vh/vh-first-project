export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export enum Permissions {
    CREATE_USER = 'CREATE_USER',
    READ_USER = 'READ_USER',
    UPDATE_USER = 'UPDATE_USER',
    DELETE_USER = 'DELETE_USER',
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
