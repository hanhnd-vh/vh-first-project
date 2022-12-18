import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'joi';
import { ErrorResponse } from '../common/helper/responses';
import { ErrorWithCode } from '../exception/error.exception';
import Joi from '../plugins/joi';
import { HttpStatus } from './../common/constants';

export const validateBody = (schema: Joi.ObjectSchema) => {
    return async (
        request: Request<{}, {}, {}, {}>,
        response: Response,
        next: NextFunction,
    ) => {
        const { body } = request;
        try {
            const { error } = schema.validate(body, {
                abortEarly: false,
            });
            if (error) {
                const { details } = error as ValidationError;
                const errors = details.map((detail) => ({
                    message: detail.message,
                    code: HttpStatus.BAD_REQUEST,
                    key: detail.context?.key,
                }));
                return response
                    .status(HttpStatus.BAD_REQUEST)
                    .send(
                        new ErrorResponse(HttpStatus.BAD_REQUEST, 'Bad request!', errors),
                    );
            }
            next();
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
};

export const validateQuery = (schema: Joi.ObjectSchema) => {
    return async (
        request: Request<{}, {}, {}, {}>,
        response: Response,
        next: NextFunction,
    ) => {
        const { query } = request;
        try {
            const { error } = schema.validate(query, {
                abortEarly: false,
            });
            if (error) {
                const { details } = error as ValidationError;
                const errors = details.map((detail) => ({
                    message: detail.message,
                    code: HttpStatus.BAD_REQUEST,
                    key: detail.context?.key,
                }));
                return response
                    .status(HttpStatus.BAD_REQUEST)
                    .send(
                        new ErrorResponse(HttpStatus.BAD_REQUEST, 'Bad request!', errors),
                    );
            }
            next();
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
};
