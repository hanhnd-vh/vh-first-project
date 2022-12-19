import { Regex } from '../../constants';
import Joi from '../../plugins/joi';
import { USER_PASSWORD_MIN_LENGTH } from '../users/user.constant';

export const registerSchema = Joi.object().keys({
    username: Joi.string().trim().required(),
    email: Joi.string().trim().regex(new RegExp(Regex.EMAIL)).required(),
    password: Joi.string().trim().min(USER_PASSWORD_MIN_LENGTH).required(),
});

export const loginSchema = Joi.object().keys({
    username: Joi.string().trim().required(),
    password: Joi.string().min(USER_PASSWORD_MIN_LENGTH).required(),
});
