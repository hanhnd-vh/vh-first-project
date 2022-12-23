import { Router } from 'express';
import { Permissions } from '../../constants';
import { permissions } from '../../middlewares/authorize.middleware';
import { validateBody, validateQuery } from '../../middlewares/validator.middleware';
import {
    deleteUserController,
    getUserDetailController,
    getUserListController,
    getUserMenteesController,
    getUserSelfProfileController,
    updateUserPasswordController,
    updateUserProfileController,
    updateUserRoleGroupsController,
    updateUserRolesController,
} from './user.controller';
import {
    updateUserPasswordSchema,
    updateUserProfileSchema,
    updateUserRoleGroupsSchema,
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
userRouter.patch(
    '/profile',
    validateBody(updateUserProfileSchema),
    permissions([Permissions.UPDATE_USER_PROFILE]),
    updateUserProfileController,
);
userRouter.patch(
    '/profile/change-password',
    validateBody(updateUserPasswordSchema),
    permissions([Permissions.CHANGE_PASSWORD]),
    updateUserPasswordController,
);
userRouter.get('/:id', permissions([Permissions.READ_USER]), getUserDetailController);
userRouter.get(
    '/:id/mentees',
    permissions([Permissions.READ_USER]),
    getUserMenteesController,
);
userRouter.patch(
    '/:id/change-roles',
    validateBody(updateUserRolesSchema),
    permissions([Permissions.CHANGE_USER_ROLES]),
    updateUserRolesController,
);
userRouter.patch(
    '/:id/change-role-groups',
    validateBody(updateUserRoleGroupsSchema),
    permissions([Permissions.CHANGE_USER_ROLES]),
    updateUserRoleGroupsController,
);
userRouter.delete('/:id', permissions([Permissions.DELETE_USER]), deleteUserController);

export default userRouter;
