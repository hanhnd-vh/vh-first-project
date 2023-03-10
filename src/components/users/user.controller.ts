import { Response } from 'express';
import { HttpStatus } from '../../common/constants';
import { ErrorResponse, SuccessResponse } from '../../common/helper/responses';
import { ErrorWithCode } from '../../exception/error.exception';
import { IRequestWithUser } from '../../interfaces';
import {
    IChangeUserPasswordBody,
    IChangeUserRoleGroupsBody,
    IChangeUserRolesBody,
    IGetUserListQuery,
    IUpdateUserBody,
} from './user.interface';
import {
    deleteUser,
    getUserById,
    getUserList,
    getUserMentees,
    updateUserPassword,
    updateUserProfile,
    updateUserRoleGroups,
    updateUserRoles,
} from './user.service';

export const getUserListController = async (
    request: IRequestWithUser<{}, {}, {}, IGetUserListQuery>,
    response: Response,
) => {
    const { query } = request;
    try {
        const userList = await getUserList(query);
        return response.status(HttpStatus.OK).send(new SuccessResponse(userList));
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

export const getUserDetailController = async (
    request: IRequestWithUser<{ id: number }, {}, {}, {}>,
    response: Response,
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
                    errorWithCode.message,
                ),
            );
    }
};

export const getUserSelfProfileController = async (
    request: IRequestWithUser,
    response: Response,
) => {
    const { userId } = request;
    try {
        const user = await getUserById(userId!);
        return response.status(HttpStatus.OK).send(new SuccessResponse(user));
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

export const updateUserProfileController = async (
    request: IRequestWithUser<{ id: number }, {}, IUpdateUserBody, {}>,
    response: Response,
) => {
    const { body, userId } = request;

    try {
        const user = await updateUserProfile(userId!, body);
        return response.status(HttpStatus.OK).send(new SuccessResponse(user));
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

export const updateUserPasswordController = async (
    request: IRequestWithUser<{ id: number }, {}, IChangeUserPasswordBody, {}>,
    response: Response,
) => {
    const { body, userId } = request;

    try {
        const user = await updateUserPassword(userId!, body);
        return response.status(HttpStatus.OK).send(new SuccessResponse(user));
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

export const updateUserRolesController = async (
    request: IRequestWithUser<{ id: number }, {}, IChangeUserRolesBody, {}>,
    response: Response,
) => {
    const {
        body,
        params: { id },
    } = request;

    try {
        const user = await updateUserRoles(id, body);
        return response.status(HttpStatus.OK).send(new SuccessResponse(user));
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

export const updateUserRoleGroupsController = async (
    request: IRequestWithUser<{ id: number }, {}, IChangeUserRoleGroupsBody, {}>,
    response: Response,
) => {
    const {
        body,
        params: { id },
    } = request;

    try {
        const user = await updateUserRoleGroups(id, body);
        return response.status(HttpStatus.OK).send(new SuccessResponse(user));
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

export const deleteUserController = async (
    request: IRequestWithUser<{ id: number }, {}, {}, {}>,
    response: Response,
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
                    errorWithCode.message,
                ),
            );
    }
};

export const getUserMenteesController = async (
    request: IRequestWithUser<{ id: number }, {}, {}, {}>,
    response: Response,
) => {
    const { id } = request.params;
    try {
        const mentees = await getUserMentees(id);
        return response.status(HttpStatus.OK).send(new SuccessResponse(mentees));
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
