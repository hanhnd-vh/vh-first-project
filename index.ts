import express from 'express';
import { initializeModelRelationships } from './database/models';
import sequelize from './database/sequelize';
import authRouter from './src/components/auth';
import permissionRouter from './src/components/permissions';
import roleRouter from './src/components/roles';
import userRouter from './src/components/users/';
import { authenticate } from './src/middlewares/authenticate.middleware';

const API_PREFIX = '/api/v1';

const app = express();
app.use(express.json());
app.use(`${API_PREFIX}`, authRouter);
app.use(`${API_PREFIX}/users`, authenticate, userRouter);
app.use(`${API_PREFIX}/roles`, authenticate, roleRouter);
app.use(`${API_PREFIX}/permissions`, authenticate, permissionRouter);

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
        initializeModelRelationships();
    } catch (error) {
        console.log('connect to mysql failed', error);
    }
};

bootstrap();
