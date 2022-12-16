import { Router } from 'express';
import {
    createPermissionController,
    deletePermissionController,
    getPermissionDetailController,
    getPermissionListController,
    updatePermissionController,
} from './permission.controller';

const permissionRouter = Router();

permissionRouter.get('/', getPermissionListController);
permissionRouter.post('/', createPermissionController);
permissionRouter.get('/:id', getPermissionDetailController);
permissionRouter.patch('/:id', updatePermissionController);
permissionRouter.delete('/:id', deletePermissionController);

export default permissionRouter;
