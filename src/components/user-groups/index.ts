import { Router } from 'express';
import { validateBody, validateQuery } from './../../middlewares/validator.middleware';
import {
    changeUserGroupUsersController,
    createUserGroupController,
    deleteUserGroupController,
    getUserGroupDetailController,
    getUserGroupListController,
    updateUserGroupController,
} from './user-group.controller';
import {
    createUserGroupSchema,
    updateUserGroupSchema,
    updateUserGroupUsersSchema,
    userGroupGetListQuerySchema,
} from './user-group.validator';

const userGroupRouter = Router();

userGroupRouter.get(
    '/',
    validateQuery(userGroupGetListQuerySchema),
    getUserGroupListController,
);
userGroupRouter.post('/', validateBody(createUserGroupSchema), createUserGroupController);
userGroupRouter.get('/:id', getUserGroupDetailController);
userGroupRouter.patch(
    '/:id',
    validateBody(updateUserGroupSchema),
    updateUserGroupController,
);
userGroupRouter.patch(
    '/:id/change-users',
    validateBody(updateUserGroupUsersSchema),
    changeUserGroupUsersController,
);
userGroupRouter.delete('/:id', deleteUserGroupController);

export default userGroupRouter;
