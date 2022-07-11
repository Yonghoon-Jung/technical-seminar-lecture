import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';
import * as dotenv from 'dotenv';
dotenv.config({
  path: '.env.dev' || '.env.prod',
});

export const envConfig: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: [process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod'],
  ignoreEnvFile: process.env.NODE_ENV === 'prod',
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('dev', 'prod').required(),
    DB_PORT: Joi.number().required(),
    DB_DATABASE: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_SYNCHRONIZE: Joi.boolean().required(),
    DB_LOGGING: Joi.boolean().required(),
    SERVER_PORT: Joi.number().required(),
    JWT_SECRET_KEY: Joi.string().required(),
    JWT_ALGORITHM: Joi.string().required(),
    JWT_EXPIRESIN: Joi.string().required(),
    JWT_ISSUER: Joi.string().required(),
    JWT_REFRESH_EXPIRESIN: Joi.string().required(),
  }),
};
