import { Permission } from './permission.model';
import { RoleGroupRole } from './role-group-role.model';
import { RoleGroup } from './role-group.model';
import { RolePermission } from './role-permission.model';
import { Role } from './role.model';
import { UserRole } from './user-roles.model';
import { User } from './user.model';
import { UserRoleGroup } from './user_role_group.model';

export const initializeModelRelationships = () => {
    // Role - Permission: n - n
    Role.belongsToMany(Permission, {
        through: RolePermission,
        foreignKey: 'role_id',
        as: 'permissions',
    });
    Permission.belongsToMany(Role, {
        through: RolePermission,
        foreignKey: 'permission_id',
        as: 'roles',
    });
    // User - Role: n - n
    User.belongsToMany(Role, {
        through: UserRole,
        foreignKey: 'user_id',
        as: 'roles',
    });
    Role.belongsToMany(User, {
        through: UserRole,
        foreignKey: 'role_id',
        as: 'users',
    });
    // Role group - Role: n - n
    RoleGroup.belongsToMany(Role, {
        through: RoleGroupRole,
        foreignKey: 'role_group_id',
        as: 'roles',
    });
    Role.belongsToMany(RoleGroup, {
        through: RoleGroupRole,
        foreignKey: 'role_id',
        as: 'roleGroups',
    });
    // User - Role group: n - n
    User.belongsToMany(RoleGroup, {
        through: UserRoleGroup,
        foreignKey: 'user_id',
        as: 'roleGroups',
    });
    RoleGroup.belongsToMany(User, {
        through: UserRoleGroup,
        foreignKey: 'role_group_id',
        as: 'users',
    });
};

export { Permission, RoleGroupRole, RoleGroup, Role, User, UserRole, UserRoleGroup };
