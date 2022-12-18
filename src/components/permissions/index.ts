import { Router } from 'express';
import { Roles } from '../../constants';
import { roles } from '../../middlewares/authorize.middleware';
import { validateBody, validateQuery } from '../../middlewares/validator.middleware';
import {
    createPermissionController,
    deletePermissionController,
    getPermissionDetailController,
    getPermissionListController,
    updatePermissionController,
} from './permission.controller';
import {
    createPermissionSchema,
    permissionGetListQuerySchema,
    updatePermissionSchema,
} from './permission.validator';

const permissionRouter = Router();

permissionRouter.get(
    '/',
    validateQuery(permissionGetListQuerySchema),
    roles(Roles.ADMIN),
    getPermissionListController,
);
permissionRouter.post(
    '/',
    validateBody(createPermissionSchema),
    roles(Roles.ADMIN),
    createPermissionController,
);
permissionRouter.get('/:id', roles(Roles.ADMIN), getPermissionDetailController);
permissionRouter.patch(
    '/:id',
    validateBody(updatePermissionSchema),
    roles(Roles.ADMIN),
    updatePermissionController,
);
permissionRouter.delete('/:id', roles(Roles.ADMIN), deletePermissionController);

export default permissionRouter;
