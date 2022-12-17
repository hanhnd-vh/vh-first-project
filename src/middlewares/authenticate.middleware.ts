import { NextFunction, Response } from 'express';
import { verifyToken } from '../common/helper/jwt';
import { ErrorResponse } from '../common/helper/responses';
import { ErrorWithCode } from '../exception/error.exception';
import { HttpStatus } from './../common/constants';
import { IRequestWithUser } from './../interfaces';

const extractTokenFromHeader = (authorization: string) => {
    const token = authorization.split(' ')[1];
    if (!token)
        throw new ErrorWithCode(HttpStatus.BAD_REQUEST, 'Invalid token');
    return token;
};

export const authenticate = async (
    request: IRequestWithUser,
    response: Response,
    next: NextFunction
) => {
    const { authorization } = request.headers;
    if (!authorization || Array.isArray(authorization)) {
        return response
            .status(HttpStatus.UNAUTHORIZED)
            .send(new ErrorResponse(HttpStatus.UNAUTHORIZED, 'Unauthorized'));
    }
    try {
        const token = extractTokenFromHeader(
            request.headers.authorization || ''
        );
        const payload = await verifyToken(token);
        Object.assign(request, payload);
        next();
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
