import { Request, Response } from 'express';
import { HttpStatus } from '../../common/constants';
import { ErrorResponse } from '../../common/helper/responses';
import { ErrorWithCode } from '../../exception/error.exception';
import { SuccessResponse } from './../../common/helper/responses';
import {
    IChangeRoleGroupRolesBody,
    ICreateRoleGroupBody,
    IGetRoleGroupListQuery,
    IUpdateRoleGroupBody,
} from './role-group.interface';
import {
    changeRoleGroupRoles,
    createRoleGroup,
    deleteRoleGroup,
    getRoleGroupById,
    getRoleGroupList,
    updateRoleGroup,
} from './role-group.service';

export const createRoleGroupController = async (
    request: Request<{}, {}, ICreateRoleGroupBody, {}>,
    response: Response,
) => {
    const { body } = request;
    try {
        const roleGroup = await createRoleGroup(body);
        return response.status(HttpStatus.OK).send(new SuccessResponse(roleGroup));
    } catch (error) {
        const errorWithCode = error as ErrorWithCode;
        return response
            .status(errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR)
            .send(
                new ErrorResponse(
                    errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR,
                    errorWithCode.message,
                ),
            );
    }
};

export const getRoleGroupListController = async (
    request: Request<{}, {}, {}, IGetRoleGroupListQuery>,
    response: Response,
) => {
    const { query } = request;
    try {
        const roleGroupList = await getRoleGroupList(query);
        return response.status(HttpStatus.OK).send(new SuccessResponse(roleGroupList));
    } catch (error) {
        const errorWithCode = error as ErrorWithCode;
        return response
            .status(errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR)
            .send(
                new ErrorResponse(
                    errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR,
                    errorWithCode.message,
                ),
            );
    }
};

export const getRoleGroupDetailController = async (
    request: Request<{ id: number }, {}, {}, {}>,
    response: Response,
) => {
    const { id } = request.params;

    try {
        const roleGroup = await getRoleGroupById(id);
        return response.status(HttpStatus.OK).send(new SuccessResponse(roleGroup));
    } catch (error) {
        const errorWithCode = error as ErrorWithCode;
        return response
            .status(errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR)
            .send(
                new ErrorResponse(
                    errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR,
                    errorWithCode.message,
                ),
            );
    }
};

export const updateRoleGroupController = async (
    request: Request<{ id: number }, {}, IUpdateRoleGroupBody, {}>,
    response: Response,
) => {
    const { body, params } = request;
    const { id } = params;

    try {
        const roleGroup = await updateRoleGroup(id, body);
        return response.status(HttpStatus.OK).send(new SuccessResponse(roleGroup));
    } catch (error) {
        const errorWithCode = error as ErrorWithCode;
        return response
            .status(errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR)
            .send(
                new ErrorResponse(
                    errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR,
                    errorWithCode.message,
                ),
            );
    }
};

export const changeRoleGroupRolesController = async (
    request: Request<{ id: number }, {}, IChangeRoleGroupRolesBody, {}>,
    response: Response,
) => {
    const { body, params } = request;
    const { id } = params;

    try {
        const roleGroup = await changeRoleGroupRoles(id, body);
        return response.status(HttpStatus.OK).send(new SuccessResponse(roleGroup));
    } catch (error) {
        const errorWithCode = error as ErrorWithCode;
        return response
            .status(errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR)
            .send(
                new ErrorResponse(
                    errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR,
                    errorWithCode.message,
                ),
            );
    }
};

export const deleteRoleGroupController = async (
    request: Request<{ id: number }, {}, {}, {}>,
    response: Response,
) => {
    const { id } = request.params;

    try {
        const result = await deleteRoleGroup(id);
        return response.status(HttpStatus.OK).send(new SuccessResponse(result));
    } catch (error) {
        const errorWithCode = error as ErrorWithCode;
        return response
            .status(errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR)
            .send(
                new ErrorResponse(
                    errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR,
                    errorWithCode.message,
                ),
            );
    }
};
