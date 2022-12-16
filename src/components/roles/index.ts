import { Router } from 'express';
import {
    changeRolePermissionsController,
    createRoleController,
    deleteRoleController,
    getRoleDetailController,
    getRoleListController,
    updateRoleController,
} from './role.controller';

const roleRouter = Router();

roleRouter.get('/', getRoleListController);
roleRouter.post('/', createRoleController);
roleRouter.get('/:id', getRoleDetailController);
roleRouter.patch('/:id', updateRoleController);
roleRouter.patch('/:id/change-permissions', changeRolePermissionsController);
roleRouter.delete('/:id', deleteRoleController);

export default roleRouter;
