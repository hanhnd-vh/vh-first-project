import express from 'express';
import { Permission } from './database/models/permissions.model';
import { RolePermission } from './database/models/role-permission.model';
import { Role } from './database/models/role.model';
import { UserRole } from './database/models/user-roles.model';
import { User } from './database/models/user.model';
import { getSequelize } from './database/sequelize';
import roleRouter from './src/components/roles';
import userRouter from './src/components/users/';

const app = express();
app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/roles', roleRouter);

const PORT = process.env.PORT || 3000;

app.get('/ping', (req, res) => {
    res.send('pong');
});

const bootstrap = async () => {
    app.listen(PORT, () => {
        console.log(`server is running at http:localhost:${PORT}`);
    });
    try {
        await getSequelize().authenticate();
        console.log('connected to mysql');
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

        // User - Role: n - 1
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
        getSequelize().sync({ force: false });
    } catch (error) {
        console.log('connect to mysql failed');
    }
};

bootstrap();
