import { NextFunction, Response } from 'express';
import { intersection, isArray } from 'lodash';
import { HttpStatus } from '../common/constants';
import { ErrorResponse } from '../common/helper/responses';
import { Permissions, Roles } from '../constants';
import { ErrorWithCode } from '../exception/error.exception';
import { IRequestWithUser } from '../interfaces';

export const roles = (roles: Roles | Roles[] = []) => {
    return async (request: IRequestWithUser, response: Response, next: NextFunction) => {
        try {
            // this route doesn't require any role => allow
            if (isArray(roles) && !roles.length) return next();

            const userRoles = request.roles || [];
            if (!isArray(roles) && userRoles.includes(roles as string)) {
                return next();
            }

            const roleArray = isArray(roles) ? roles : [roles];
            const intersectionRoles = intersection(roleArray, userRoles);
            if (intersectionRoles.length < roleArray.length) {
                // this user doesn't have required roles
                throw new ErrorWithCode(
                    HttpStatus.FORBIDDEN,
                    `You don't have permission on this site`,
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

export const permissions = (permissions: Permissions | Permissions[] = []) => {
    return async (request: IRequestWithUser, response: Response, next: NextFunction) => {
        try {
            // this route doesn't require any permissions => allow
            if (isArray(permissions) && !permissions.length) return next();

            const userPermissions = request.permissions || [];
            if (
                !isArray(permissions) &&
                userPermissions.includes(permissions as string)
            ) {
                return next();
            }

            const permissionArray = isArray(permissions) ? permissions : [permissions];
            const intersectionPermissions = intersection(
                permissionArray,
                userPermissions,
            );
            if (intersectionPermissions.length < permissionArray.length) {
                // this user doesn't have required permissions
                throw new ErrorWithCode(
                    HttpStatus.FORBIDDEN,
                    `You don't have permission on this site`,
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
