import {
    DEFAULT_ERROR_MESSAGE_RESPONSE,
    DEFAULT_SUCCESS_MESSAGE_RESPONSE,
    HttpStatus,
} from './../constants';

export interface IErrorResponse {
    key?: string;
    code: number;
    message?: string;
}

export class SuccessResponse {
    constructor(data = {}) {
        return {
            code: HttpStatus.OK,
            message: DEFAULT_SUCCESS_MESSAGE_RESPONSE,
            data,
        };
    }
}

export class ErrorResponse {
    constructor(
        code = HttpStatus.INTERNAL_SERVER_ERROR,
        message = DEFAULT_ERROR_MESSAGE_RESPONSE,
        errors: IErrorResponse[] = [],
    ) {
        return {
            code,
            message,
            errors,
        };
    }
}
