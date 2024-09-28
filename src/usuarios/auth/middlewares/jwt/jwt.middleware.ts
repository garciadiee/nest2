import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { AuthService } from 'src/usuarios/auth/auth.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly usuariosService: UsuariosService,
  ) {}
 async use(req: any, res: any, next: () => void) {
    try {
      //*Obtenemos el token desde el heeaders de la peticion, y lo separaramos de "Bearer"
      const tokenArray: string[] = req.heeaders['authorization'].split(' ');

      const decodedToken = await this.authService.verifyJwt(tokenArray[1]);

      if (decodedToken) {
        const usuario = await this.usuariosService.getOne(decodedToken.sub);
        if (usuario) next();
        else throw new UnauthorizedException('Token invalido');
      } else {
        throw new UnauthorizedException('Token invalido');
      }
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Token invalido');
    }
  }
}

