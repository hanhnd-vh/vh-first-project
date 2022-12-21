import { Request, Response } from 'express';
import { HttpStatus } from '../../common/constants';
import { ErrorResponse } from '../../common/helper/responses';
import { ErrorWithCode } from '../../exception/error.exception';
import { SuccessResponse } from './../../common/helper/responses';
import {
    IChangeUserGroupUsersBody,
    ICreateUserGroupBody,
    IGetUserGroupListQuery,
    IUpdateUserGroupBody,
} from './user-group.interface';
import {
    changeUserGroupUsers,
    createUserGroup,
    deleteUserGroup,
    getUserGroupById,
    getUserGroupList,
    updateUserGroup,
} from './user-group.service';

export const createUserGroupController = async (
    request: Request<{}, {}, ICreateUserGroupBody, {}>,
    response: Response,
) => {
    const { body } = request;
    try {
        const createdUserGroup = await createUserGroup(body);
        return response
            .status(HttpStatus.CREATED)
            .send(new SuccessResponse(createdUserGroup));
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

export const getUserGroupListController = async (
    request: Request<{}, {}, {}, IGetUserGroupListQuery>,
    response: Response,
) => {
    const { query } = request;
    try {
        const userGroupList = await getUserGroupList(query);
        return response.status(HttpStatus.OK).send(new SuccessResponse(userGroupList));
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

export const getUserGroupDetailController = async (
    request: Request<{ id: number }, {}, {}, {}>,
    response: Response,
) => {
    const {
        params: { id },
    } = request;
    try {
        const userGroupDetail = await getUserGroupById(id);
        return response.status(HttpStatus.OK).send(new SuccessResponse(userGroupDetail));
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

export const updateUserGroupController = async (
    request: Request<{ id: number }, {}, IUpdateUserGroupBody, {}>,
    response: Response,
) => {
    const {
        body,
        params: { id },
    } = request;
    try {
        const updatedUserGroup = await updateUserGroup(id, body);
        return response.status(HttpStatus.OK).send(new SuccessResponse(updatedUserGroup));
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

export const changeUserGroupUsersController = async (
    request: Request<{ id: number }, {}, IChangeUserGroupUsersBody, {}>,
    response: Response,
) => {
    const {
        body,
        params: { id },
    } = request;

    try {
        const updatedUserGroup = await changeUserGroupUsers(id, body);
        return response.status(HttpStatus.OK).send(new SuccessResponse(updatedUserGroup));
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

export const deleteUserGroupController = async (
    request: Request<{ id: number }, {}, {}, {}>,
    response: Response,
) => {
    const {
        params: { id },
    } = request;
    try {
        const result = await deleteUserGroup(id);
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
