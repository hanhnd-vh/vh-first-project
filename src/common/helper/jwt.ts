import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY || 'secret';
const ACCESS_TOKEN_SECRET_EXPIRES_IN =
    process.env.ACCESS_TOKEN_SECRET_EXPIRES_IN || '10m';

export interface IJwtPayload {
    userId: number;
    username: string;
    roles: string[];
    permissions: string[];
}

export const signToken = async (
    payload: IJwtPayload,
    secretKey = ACCESS_TOKEN_SECRET_KEY,
    expiresIn = ACCESS_TOKEN_SECRET_EXPIRES_IN
) => {
    return jwt.sign(payload, secretKey, {
        expiresIn,
    });
};

export const verifyToken = async (
    token: string,
    secretKey = ACCESS_TOKEN_SECRET_KEY
): Promise<IJwtPayload> => {
    return jwt.verify(token, secretKey) as IJwtPayload;
};
