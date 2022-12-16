import { HttpStatus } from '../common/constants';

export class ErrorWithCode extends Error {
    code: number;
    constructor(code = HttpStatus.INTERNAL_SERVER_ERROR, message?: string) {
        super(message);
        this.code = code;
    }
}
