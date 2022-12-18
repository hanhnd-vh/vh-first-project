import { Request, Response } from 'express';
import { HttpStatus } from '../../common/constants';
import { ErrorResponse } from '../../common/helper/responses';
import { ErrorWithCode } from '../../exception/error.exception';
import { SuccessResponse } from './../../common/helper/responses';
import {
    ICreatePermissionBody,
    IGetPermissionListQuery,
    IUpdatePermissionBody,
} from './permission.interface';
import {
    createPermission,
    deletePermission,
    getPermissionById,
    getPermissionList,
    updatePermission,
} from './permission.service';

export const createPermissionController = async (
    request: Request<{}, {}, ICreatePermissionBody, {}>,
    response: Response,
) => {
    const { body } = request;
    try {
        const permission = await createPermission(body);
        return response.status(HttpStatus.OK).send(new SuccessResponse(permission));
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

export const getPermissionListController = async (
    request: Request<{}, {}, {}, IGetPermissionListQuery>,
    response: Response,
) => {
    const { query } = request;
    try {
        const permissionList = await getPermissionList(query);
        return response.status(HttpStatus.OK).send(new SuccessResponse(permissionList));
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

export const getPermissionDetailController = async (
    request: Request<{ id: number }, {}, {}, {}>,
    response: Response,
) => {
    const { id } = request.params;

    try {
        const permission = await getPermissionById(id);
        return response.status(HttpStatus.OK).send(new SuccessResponse(permission));
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

export const updatePermissionController = async (
    request: Request<{ id: number }, {}, IUpdatePermissionBody, {}>,
    response: Response,
) => {
    const { body, params } = request;
    const { id } = params;

    try {
        const permission = await updatePermission(id, body);
        return response.status(HttpStatus.OK).send(new SuccessResponse(permission));
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

export const deletePermissionController = async (
    request: Request<{ id: number }, {}, {}, {}>,
    response: Response,
) => {
    const { id } = request.params;

    try {
        const result = await deletePermission(id);
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
