import express from 'express';
import { Action } from './database/models/action.model';
import { Permission } from './database/models/permissions.model';
import { Resource } from './database/models/resource.model';
import { RolePermission } from './database/models/role-permission.model';
import { Role } from './database/models/role.model';
import { User } from './database/models/user.model';
import { getSequelize } from './database/sequelize';
import userRouter from './src/components/users/';

const app = express();
app.use(express.json());
app.use('/users', userRouter);

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
        // Permission - Action: 1 - 1
        Action.hasOne(Permission, {
            foreignKey: 'action_id',
        });
        Permission.belongsTo(Action);

        // Permission - Resource: 1 - 1
        Resource.hasOne(Permission, {
            foreignKey: 'resource_id',
        });
        Permission.belongsTo(Resource);

        // Role - Permission: n - n
        Role.belongsToMany(Permission, {
            through: RolePermission,
            foreignKey: 'role_id',
        });
        Permission.belongsToMany(Role, {
            through: RolePermission,
            foreignKey: 'permission_id',
        });

        // User - Role: n - 1
        User.belongsTo(Role, {
            foreignKey: 'role_id',
        });
        Role.hasMany(User, {
            foreignKey: 'role_id',
        });
        getSequelize().sync({ force: false });
    } catch (error) {
        console.log('connect to mysql failed');
    }
};

bootstrap();
