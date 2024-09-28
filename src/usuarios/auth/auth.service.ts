import { forwardRef, Inject, Injectable, UnauthorizedException, } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { UsuarioDto } from "../usuarios.dto";
import { UsuariosService } from "../usuarios.service";
import { Role } from "../usuarios.entity";



@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @Inject(forwardRef(() => UsuariosService))
        private userService: UsuariosService
    ) { }

    /**
     * @param password new user's pasword
     * @returns hashed password
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

/*
    async validateUserPassword(
    password: string,
    hashedPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
*/
 async comparePassword(
    password: string,
    hashPassword: string,
 ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
 }

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
        role: user.role
    };
    //*Retornamos el token
    return this.jwtService.signAsync(payload);
 }

async verificarRol(role: Role, token: string) {
    try{
        const decodeUser = await this.verifyJwt(token);
        const usuario = await this.userService.getOne(decodeUser.sub)

        if(role === Role.USER){
            throw new UnauthorizedException('${role} no tiene acceso')
        }

        return role.includes(usuario.role)
    } catch (error) {
        throw new UnauthorizedException('token invalido')
    }
}

}