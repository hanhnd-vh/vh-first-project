import { Router } from 'express';
import { validateBody, validateQuery } from '../../middlewares/validator.middleware';
import {
    changeRoleGroupRolesController,
    createRoleGroupController,
    deleteRoleGroupController,
    getRoleGroupDetailController,
    getRoleGroupListController,
    updateRoleGroupController,
} from './role-group.controller';
import {
    createRoleGroupSchema,
    roleGroupGetListQuerySchema,
    updateRoleGroupRolesSchema,
    updateRoleGroupSchema,
} from './role-group.validator';

const roleGroupRouter = Router();

roleGroupRouter.get(
    '/',
    validateQuery(roleGroupGetListQuerySchema),
    getRoleGroupListController,
);
roleGroupRouter.post('/', validateBody(createRoleGroupSchema), createRoleGroupController);
roleGroupRouter.get('/:id', getRoleGroupDetailController);
roleGroupRouter.patch(
    '/:id',
    validateBody(updateRoleGroupSchema),
    updateRoleGroupController,
);
roleGroupRouter.patch(
    '/:id/change-roles',
    validateBody(updateRoleGroupRolesSchema),
    changeRoleGroupRolesController,
);
roleGroupRouter.delete('/:id', deleteRoleGroupController);

export default roleGroupRouter;
