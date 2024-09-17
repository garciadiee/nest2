import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { envs } from "./envs";

export const db: TypeOrmModuleOptions = {
    type: 'mysql',
    host: envs.host,
    username: envs.user,
    password: envs.pass,
    database: envs.database,
    entities: [],
    autoLoadEntities: true, //Carga entidades
    synchronize: true, //Realiza migraciones de la tabla
};