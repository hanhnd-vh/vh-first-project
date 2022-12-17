import { Router } from 'express';
import { Roles } from '../../constants';
import { roles } from '../../middlewares/authorize.middleware';
import {
    createPermissionController,
    deletePermissionController,
    getPermissionDetailController,
    getPermissionListController,
    updatePermissionController,
} from './permission.controller';

const permissionRouter = Router();

permissionRouter.get('/', roles(Roles.ADMIN), getPermissionListController);
permissionRouter.post('/', roles(Roles.ADMIN), createPermissionController);
permissionRouter.get('/:id', roles(Roles.ADMIN), getPermissionDetailController);
permissionRouter.patch('/:id', roles(Roles.ADMIN), updatePermissionController);
permissionRouter.delete('/:id', roles(Roles.ADMIN), deletePermissionController);

export default permissionRouter;
