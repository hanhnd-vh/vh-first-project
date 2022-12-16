import { Request, Response } from 'express';
import { HttpStatus } from '../../common/constants';
import { ErrorResponse } from '../../common/helper/responses';
import { ErrorWithCode } from '../../exception/error.exception';
import { SuccessResponse } from './../../common/helper/responses';
import {
    ICreateRoleBody,
    IGetRoleListQuery,
    IUpdateRoleBody,
} from './role.interface';
import {
    createRole,
    deleteRole,
    getRoleById,
    getRoleList,
    updateRole,
} from './role.service';

export const createRoleController = async (
    request: Request<{}, {}, ICreateRoleBody, {}>,
    response: Response
) => {
    const { body } = request;
    try {
        const role = await createRole(body);
        return response.status(HttpStatus.OK).send(new SuccessResponse(role));
    } catch (error) {
        const errorWithCode = error as ErrorWithCode;
        return response
            .status(errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR)
            .send(
                new ErrorResponse(
                    errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR,
                    errorWithCode.message
                )
            );
    }
};

export const getRoleListController = async (
    request: Request<{}, {}, {}, IGetRoleListQuery>,
    response: Response
) => {
    const { query } = request;
    try {
        const roleList = await getRoleList(query);
        return response
            .status(HttpStatus.OK)
            .send(new SuccessResponse(roleList));
    } catch (error) {
        const errorWithCode = error as ErrorWithCode;
        return response
            .status(errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR)
            .send(
                new ErrorResponse(
                    errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR,
                    errorWithCode.message
                )
            );
    }
};

export const getRoleDetailController = async (
    request: Request<{ id: number }, {}, {}, {}>,
    response: Response
) => {
    const { id } = request.params;

    try {
        const role = await getRoleById(id);
        return response.status(HttpStatus.OK).send(new SuccessResponse(role));
    } catch (error) {
        const errorWithCode = error as ErrorWithCode;
        return response
            .status(errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR)
            .send(
                new ErrorResponse(
                    errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR,
                    errorWithCode.message
                )
            );
    }
};

export const updateRoleController = async (
    request: Request<{ id: number }, {}, IUpdateRoleBody, {}>,
    response: Response
) => {
    const { body, params } = request;
    const { id } = params;

    try {
        const role = await updateRole(id, body);
        return response.status(HttpStatus.OK).send(new SuccessResponse(role));
    } catch (error) {
        const errorWithCode = error as ErrorWithCode;
        return response
            .status(errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR)
            .send(
                new ErrorResponse(
                    errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR,
                    errorWithCode.message
                )
            );
    }
};

export const deleteRoleController = async (
    request: Request<{ id: number }, {}, {}, {}>,
    response: Response
) => {
    const { id } = request.params;

    try {
        const result = await deleteRole(id);
        return response.status(HttpStatus.OK).send(new SuccessResponse(result));
    } catch (error) {
        const errorWithCode = error as ErrorWithCode;
        return response
            .status(errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR)
            .send(
                new ErrorResponse(
                    errorWithCode.code || HttpStatus.INTERNAL_SERVER_ERROR,
                    errorWithCode.message
                )
            );
    }
};
