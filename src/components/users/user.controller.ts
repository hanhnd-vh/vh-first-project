import { Response } from 'express';
import { HttpStatus } from '../../common/constants';
import { ErrorResponse, SuccessResponse } from '../../common/helper/responses';
import { ErrorWithCode } from '../../exception/error.exception';
import { IRequestWithUser } from '../../interfaces';
import {
    IChangeUserPasswordBody,
    IChangeUserRolesBody,
    ICreateUserBody,
    IGetUserListQuery,
    IUpdateUserBody,
} from './user.interface';
import {
    createUser,
    deleteUser,
    getUserById,
    getUserList,
    updateUserPassword,
    updateUserProfile,
    updateUserRoles,
} from './user.service';

export const getUserListController = async (
    request: IRequestWithUser<{}, {}, {}, IGetUserListQuery>,
    response: Response
) => {
    const { query } = request;
    try {
        const userList = await getUserList(query);
        return response
            .status(HttpStatus.OK)
            .send(new SuccessResponse(userList));
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

export const createUserController = async (
    request: IRequestWithUser<{}, {}, ICreateUserBody, {}>,
    response: Response
) => {
    const { body } = request;
    try {
        const user = await createUser(body);
        return response.status(HttpStatus.OK).send(new SuccessResponse(user));
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

export const getUserDetailController = async (
    request: IRequestWithUser<{ id: number }, {}, {}, {}>,
    response: Response
) => {
    const { id } = request.params;
    try {
        const user = await getUserById(id);
        return response.status(HttpStatus.OK).send(new SuccessResponse(user));
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

export const updateUserProfileController = async (
    request: IRequestWithUser<{ id: number }, {}, IUpdateUserBody, {}>,
    response: Response
) => {
    const { body, params } = request;
    const { id } = params;

    try {
        const user = await updateUserProfile(request.userId || id, body); // temporary util request.userId works
        return response.status(HttpStatus.OK).send(new SuccessResponse(user));
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

export const updateUserPasswordController = async (
    request: IRequestWithUser<{ id: number }, {}, IChangeUserPasswordBody, {}>,
    response: Response
) => {
    const { body, params } = request;
    const { id } = params;

    try {
        const user = await updateUserPassword(request.userId || id, body); // temporary util request.userId works
        return response.status(HttpStatus.OK).send(new SuccessResponse(user));
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

export const updateUserRolesController = async (
    request: IRequestWithUser<{ id: number }, {}, IChangeUserRolesBody, {}>,
    response: Response
) => {
    const { body, params } = request;
    const { id } = params;

    try {
        const user = await updateUserRoles(request.userId || id, body); // temporary util request.userId works
        return response.status(HttpStatus.OK).send(new SuccessResponse(user));
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

export const deleteUserController = async (
    request: IRequestWithUser<{ id: number }, {}, {}, {}>,
    response: Response
) => {
    const { id } = request.params;
    try {
        const result = await deleteUser(id);
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
