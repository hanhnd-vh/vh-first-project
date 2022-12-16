import { Router } from 'express';
import {
    createUserController,
    deleteUserController,
    getUserDetailController,
    getUserListController,
    updateUserPasswordController,
    updateUserProfileController,
    updateUserRolesController,
} from './user.controller';

const userRouter = Router();

userRouter.get('/', getUserListController);
userRouter.post('/', createUserController);
userRouter.get('/:id', getUserDetailController);
userRouter.patch('/:id', updateUserProfileController);
userRouter.patch('/:id/change-password', updateUserPasswordController);
userRouter.patch('/:id/change-roles', updateUserRolesController);
userRouter.delete('/:id', deleteUserController);

export default userRouter;
