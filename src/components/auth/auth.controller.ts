import { Request, Response } from 'express';
import { HttpStatus } from '../../common/constants';
import { ErrorResponse, SuccessResponse } from '../../common/helper/responses';
import { ErrorWithCode } from '../../exception/error.exception';
import { ILoginBody, IRegisterBody } from './auth.interface';
import { logIn, register } from './auth.service';

export const loginController = async (
    request: Request<{}, {}, ILoginBody, {}>,
    response: Response,
) => {
    const { body } = request;
    try {
        const token = await logIn(body);
        return response.status(HttpStatus.OK).send(new SuccessResponse(token));
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

export const registerController = async (
    request: Request<{}, {}, IRegisterBody, {}>,
    response: Response,
) => {
    const { body } = request;
    try {
        const token = await register(body);
        return response.status(HttpStatus.OK).send(new SuccessResponse(token));
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
