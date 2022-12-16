import { Router } from 'express';
import {
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
roleRouter.delete('/:id', deleteRoleController);

export default roleRouter;
