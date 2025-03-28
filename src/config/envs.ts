import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  AUTH_MICROSERVICE_HOST: string;
  AUTH_MICROSERVICE_PORT: number;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  JWT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  FRONTEND_URL: string;
}

const envVarsSchema = joi.object({
  PORT: joi.number().required(),
  AUTH_MICROSERVICE_HOST: joi.string().required(),
  AUTH_MICROSERVICE_PORT: joi.number().required(),
  GOOGLE_CLIENT_ID: joi.string().required(),
  GOOGLE_CLIENT_SECRET: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  GOOGLE_CALLBACK_URL: joi.string().required(),
  FRONTEND_URL: joi.string().required(),
}).unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  authMicroserviceHost: envVars.AUTH_MICROSERVICE_HOST,
  authMicroservicePort: envVars.AUTH_MICROSERVICE_PORT,
  googleClientId: envVars.GOOGLE_CLIENT_ID,
  googleClientSecret: envVars.GOOGLE_CLIENT_SECRET,
  jwtSecret: envVars.JWT_SECRET,
  googleCallbackUrl: envVars.GOOGLE_CALLBACK_URL,
  frontendUrl: envVars.FRONTEND_URL,
}