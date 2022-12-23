const bcrypt = require('bcrypt');

const Permissions = [
    'CREATE_USER',
    'READ_USER',
    'UPDATE_USER_PROFILE',
    'CHANGE_PASSWORD',
    'CHANGE_USER_ROLES',
    'DELETE_USER',
    'CREATE_ROLE',
    'READ_ROLE',
    'UPDATE_ROLE',
    'DELETE_ROLE',
    'CREATE_ROLE_GROUP',
    'READ_ROLE_GROUP',
    'UPDATE_ROLE_GROUP',
    'DELETE_ROLE_GROUP',
];
const seedingPermissions = Permissions.map((permission, index) => {
    return {
        id: index + 1,
        name: permission,
        created_at: new Date(),
        updated_at: new Date(),
    };
});

const Roles = ['ADMIN', 'USER'];
const seedingRoles = Roles.map((role, index) => {
    return {
        id: index + 1,
        name: role,
        created_at: new Date(),
        updated_at: new Date(),
    };
});

const seedingUsers = [
    {
        id: 1,
        username: 'vuihoc',
        password: bcrypt.hashSync('password', 10),
        email: 'vh@vuihoc.vn',
        created_at: new Date(),
        updated_at: new Date(),
    },
];

const seedingUserRoles = [
    {
        id: 1,
        role_id: seedingRoles[0].id,
        user_id: seedingUsers[0].id,
        created_at: new Date(),
        updated_at: new Date(),
    },
];

const seedingRolePermissions = seedingPermissions.map((seedingPermission, index) => {
    return {
        id: index + 1,
        role_id: seedingRoles[0].id,
        permission_id: seedingPermission.id,
        created_at: new Date(),
        updated_at: new Date(),
    };
});

module.exports = {
    Permissions,
    seedingPermissions,
    seedingRoles,
    Roles,
    seedingUsers,
    seedingUserRoles,
    seedingRolePermissions,
};
