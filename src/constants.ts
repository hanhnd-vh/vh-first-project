export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export enum PermissionAction {
    CREATE = 'CREATE',
    READ = 'READ',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

export enum PermissionResource {
    USER = 'USER',
}

export enum OrderDirection {
    ASC = 'asc',
    DESC = 'desc',
}

export enum OrderBy {
    ID = 'id',
}

export const DEFAULT_PAGE_VALUE = 1;
export const DEFAULT_PAGE_LIMIT = 10;
export const DEFAULT_ORDER_BY = OrderBy.ID;
export const DEFAULT_ORDER_DIRECTION = OrderDirection.DESC;
