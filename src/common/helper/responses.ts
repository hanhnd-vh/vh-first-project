import {
    DEFAULT_ERROR_MESSAGE_RESPONSE,
    DEFAULT_SUCCESS_MESSAGE_RESPONSE,
    HttpStatus,
} from './../constants';

export interface IErrorResponse {
    key?: string;
    errorCode: number;
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
        errors: IErrorResponse[] = []
    ) {
        return {
            code,
            message,
            errors,
        };
    }
}

export class InternalErrorResponse {
    constructor() {
        return new ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            'An error occurred. Try again.'
        );
    }
}
