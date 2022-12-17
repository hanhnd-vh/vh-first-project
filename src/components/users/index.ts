import { Router } from 'express';
import { Permissions } from '../../constants';
import { permissions } from '../../middlewares/authorize.middleware';
import {
    deleteUserController,
    getUserDetailController,
    getUserListController,
    updateUserPasswordController,
    updateUserProfileController,
    updateUserRolesController,
} from './user.controller';

const userRouter = Router();

userRouter.get(
    '/',
    permissions([Permissions.READ_USER]),
    getUserListController
);
userRouter.get(
    '/:id',
    permissions([Permissions.READ_USER]),
    getUserDetailController
);
userRouter.patch(
    '/:id',
    permissions([Permissions.UPDATE_USER_PROFILE]),
    updateUserProfileController
);
userRouter.patch(
    '/:id/change-password',
    permissions([Permissions.CHANGE_PASSWORD]),
    updateUserPasswordController
);
userRouter.patch(
    '/:id/change-roles',
    permissions([Permissions.CHANGE_USER_ROLES]),
    updateUserRolesController
);
userRouter.delete(
    '/:id',
    permissions([Permissions.DELETE_USER]),
    deleteUserController
);

export default userRouter;
