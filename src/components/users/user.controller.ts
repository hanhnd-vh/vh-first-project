import { Response } from 'express';
import { HttpStatus } from '../../common/constants';
import {
    InternalErrorResponse,
    SuccessResponse,
} from '../../common/helper/responses';
import {
    ICreateUserBody,
    IGetUserListQuery,
    IRequestWithUser,
    IUpdateUserBody,
} from './user.interface';
import {
    createUser,
    deleteUser,
    getUserById,
    getUserList,
    updateUserProfile,
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
        return response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send(new InternalErrorResponse());
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
        return response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send(new InternalErrorResponse());
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
        return response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send(new InternalErrorResponse());
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
        return response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send(new InternalErrorResponse());
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
        return response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send(new InternalErrorResponse());
    }
};
