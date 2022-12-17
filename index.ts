import express from 'express';
import { Permission } from './database/models/permission.model';
import { RolePermission } from './database/models/role-permission.model';
import { Role } from './database/models/role.model';
import { UserRole } from './database/models/user-roles.model';
import { User } from './database/models/user.model';
import sequelize from './database/sequelize';
import authRouter from './src/components/auth';
import permissionRouter from './src/components/permissions';
import roleRouter from './src/components/roles';
import userRouter from './src/components/users/';

const API_PREFIX = '/api/v1';

const app = express();
app.use(express.json());
app.use(`${API_PREFIX}`, authRouter);
app.use(`${API_PREFIX}/users`, userRouter);
app.use(`${API_PREFIX}/roles`, roleRouter);
app.use(`${API_PREFIX}/permissions`, permissionRouter);

const PORT = process.env.PORT || 3000;

app.get('/ping', (req, res) => {
    res.send('pong');
});

const bootstrap = async () => {
    app.listen(PORT, () => {
        console.log(`server is running at http:localhost:${PORT}`);
    });
    try {
        await sequelize.authenticate();
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

        sequelize.sync({ force: false });
    } catch (error) {
        console.log('connect to mysql failed', error);
    }
};

bootstrap();
