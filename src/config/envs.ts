import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    DB_HOST: string;
    DB_USER: string;
    DB_PASS: string;
    DATABASE: string;
    JWT_SEED: string;
}

const envsSchema = joi
.object({
    PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
    DB_USER: joi.string().required(),
    DB_PASS: joi.string().required(),
    DATABASE: joi.string().required(),
    JWT_SEED: joi.string().required(),
})
.unknown(true);

const { error, value} = envsSchema.validate(process.env);

if (error) throw new Error ('Config validation error: ${error.messege}');

const EnvVars: EnvVars = value;

export const envs = {
    port: EnvVars.PORT,
  host: EnvVars.DB_HOST,
  user: EnvVars.DB_USER,
  pass: EnvVars.DB_PASS,
  database: EnvVars.DATABASE,
  jwt: EnvVars.JWT_SEED,
}