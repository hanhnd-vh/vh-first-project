import { Router } from 'express';
import { Permissions } from '../../constants';
import { permissions } from '../../middlewares/authorize.middleware';
import { validateBody, validateQuery } from '../../middlewares/validator.middleware';
import {
    deleteUserController,
    getUserDetailController,
    getUserListController,
    getUserSelfProfileController,
    updateUserPasswordController,
    updateUserProfileController,
    updateUserRolesController,
} from './user.controller';
import {
    updateUserPasswordSchema,
    updateUserProfileSchema,
    updateUserRolesSchema,
    userGetListQuerySchema,
} from './user.validator';

const userRouter = Router();

userRouter.get(
    '/',
    validateQuery(userGetListQuerySchema),
    permissions([Permissions.READ_USER]),
    getUserListController,
);
userRouter.get('/profile', getUserSelfProfileController);
userRouter.get('/:id', permissions([Permissions.READ_USER]), getUserDetailController);
userRouter.patch(
    '/:id',
    validateBody(updateUserProfileSchema),
    permissions([Permissions.UPDATE_USER_PROFILE]),
    updateUserProfileController,
);
userRouter.patch(
    '/:id/change-password',
    validateBody(updateUserPasswordSchema),
    permissions([Permissions.CHANGE_PASSWORD]),
    updateUserPasswordController,
);
userRouter.patch(
    '/:id/change-roles',
    validateBody(updateUserRolesSchema),
    permissions([Permissions.CHANGE_USER_ROLES]),
    updateUserRolesController,
);
userRouter.delete('/:id', permissions([Permissions.DELETE_USER]), deleteUserController);

export default userRouter;
