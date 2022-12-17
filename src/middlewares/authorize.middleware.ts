import { NextFunction, Response } from 'express';
import { intersection, isArray } from 'lodash';
import { HttpStatus } from '../common/constants';
import { ErrorResponse } from '../common/helper/responses';
import { Permissions, Roles } from '../constants';
import { ErrorWithCode } from '../exception/error.exception';
import { IRequestWithUser } from '../interfaces';

export const roles = (roles: Roles | Roles[] = []) => {
    return async (
        request: IRequestWithUser,
        response: Response,
        next: NextFunction
    ) => {
        try {
            // this route doesn't require any role => allow
            if (!roles.length) next();

            const userRoles = request.roles || [];

            if (!isArray(roles) && userRoles.includes(roles)) {
                next();
            }

            const intersectionRoles = intersection(roles, userRoles);
            if (intersectionRoles.length < roles.length) {
                // this user doesn't have required roles
                throw new ErrorWithCode(
                    HttpStatus.FORBIDDEN,
                    `You don't have permission on this site`
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
                        errorWithCode.message
                    )
                );
        }
    };
};

export const permissions = (permissions: Permissions | Permissions[] = []) => {
    return async (
        request: IRequestWithUser,
        response: Response,
        next: NextFunction
    ) => {
        try {
            // this route doesn't require any permissions => allow
            if (!permissions.length) next();

            const userPermissions = request.permissions || [];

            if (
                !isArray(permissions) &&
                userPermissions.includes(permissions)
            ) {
                next();
            }

            const intersectionPermissions = intersection(
                permissions,
                userPermissions
            );
            if (intersectionPermissions.length < permissions.length) {
                // this user doesn't have required permissions
                throw new ErrorWithCode(
                    HttpStatus.FORBIDDEN,
                    `You don't have permission on this site`
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
                        errorWithCode.message
                    )
                );
        }
    };
};
