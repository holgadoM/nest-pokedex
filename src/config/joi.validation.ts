import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    PORT:Joi.number().default(3002) ,
    STRING_CONEXION_MONGO:Joi.required(),
    NODE_ENV:Joi.required().default('dev'),
    DEFAULT_LIMIT: Joi.number().default(7),
})