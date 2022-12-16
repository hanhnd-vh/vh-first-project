import { Router } from 'express';
import {
    createUserController,
    deleteUserController,
    getUserDetailController,
    getUserListController,
    updateUserProfileController,
} from './user.controller';

const userRouter = Router();

userRouter.get('/', getUserListController);
userRouter.post('/', createUserController);
userRouter.get('/:id', getUserDetailController);
userRouter.patch('/:id', updateUserProfileController);
userRouter.delete('/:id', deleteUserController);

export default userRouter;
