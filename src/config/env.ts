/*
import 'dotenv/config';
import * as joi from 'joi';
import { EntitySchemaOptions } from 'typeorm';

interface EnvVars {
    PORT: number;
}

const envsSchema = joi
.objetc({
    PORT: joi.number().required(),
})
.unknown(true);

const { error, value} = envsSchema.validate(process.env);

if (error) throw new error ('Config validation error: $(error.messege)');

const EnvVars: EnvVars = value;

export const envs = {

}*/