import { Router } from 'express';
import { Permissions, Roles } from '../../constants';
import { permissions, roles } from '../../middlewares/authorize.middleware';
import { validateBody, validateQuery } from '../../middlewares/validator.middleware';
import {
    changeRolePermissionsController,
    createRoleController,
    deleteRoleController,
    getRoleDetailController,
    getRoleListController,
    updateRoleController,
} from './role.controller';
import {
    createRoleSchema,
    roleGetListQuerySchema,
    updateRolePermissionsSchema,
    updateRoleSchema,
} from './role.validator';

const roleRouter = Router();

roleRouter.get(
    '/',
    validateQuery(roleGetListQuerySchema),
    permissions(Permissions.READ_ROLE),
    getRoleListController,
);
roleRouter.get(
    '/get-roles-no-permissions',
    validateQuery(roleGetListQuerySchema),
    getRoleListController,
);
roleRouter.get('/get-roles-no-validation', getRoleListController);
roleRouter.post(
    '/',
    validateBody(createRoleSchema),
    permissions(Permissions.CREATE_ROLE),
    createRoleController,
);
roleRouter.get('/:id', permissions(Permissions.READ_ROLE), getRoleDetailController);
roleRouter.patch(
    '/:id',
    validateBody(updateRoleSchema),
    permissions(Permissions.UPDATE_ROLE),
    updateRoleController,
);
roleRouter.patch(
    '/:id/change-permissions',
    validateBody(updateRolePermissionsSchema),
    roles(Roles.ADMIN),
    changeRolePermissionsController,
);
roleRouter.delete('/:id', permissions(Permissions.DELETE_ROLE), deleteRoleController);

export default roleRouter;
