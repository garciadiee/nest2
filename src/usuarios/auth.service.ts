import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { UsuarioDto } from "./usuarios.dto";
import { QueryFailedError } from "typeorm";


@Injectable()
export class AuthService {

/** 
 *  @param password user's password
 *  @returns hashed password
 */
async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

/**
 * @description compares the login password with the stored
 * @param password imput password
 * @param hashPassword stored user's password
 * @returns boolean
 */
 async comparePassword(
    password: string,
    hashPassword: string,
 ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
 }

 //*Funcion para verificar el token
 constructor(private jwtService: JwtService) {}
 /**
  * @description compare user session jwt
  * @param jwt jwt from client
  * @returns payload
  */
 async verifyJwt(jwt: string): Promise<any> {
     return await this.jwtService.verifyAsync(jwt);
 }
 /**
  * @param Usuario
  * @returns token generado
  */

 //*Funcion para generar token
 async generateJwt(user: UsuarioDto): Promise<string> {
    /**
     * @description
     * Creamos el payload con la informacion del usuario
     */
    const payload = {
        sub: user.id,
        email: user.email,
        nombre: user.nombre,
    };
    //*Retornamos el token
    return this.jwtService.signAsync(payload);
 }
 //*Funcion que encuentre a un usuario
 /**
  * @description Obtiene un usuario
  * @param id ID del usuario
  * @returns UsuarioDTO
  */
 
 }