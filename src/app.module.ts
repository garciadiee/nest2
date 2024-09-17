import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { JwtMiddleware } from './usuarios/auth/middlewares/jwt/jwt.middleware';
import { db } from './common';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [/*configuraciones globales para toda la app**/
  TypeOrmModule.forRoot(db),
  UsuariosModule,
  SocketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    //*Le pasamos las rutas que van a tener que pasar por la comprobacion de Token
    //*Las que no necesitan ser protegidas como el register y login las ponemos dentro del exclude 
    consumer
    .apply(JwtMiddleware)
    .exclude(
      {
        path: '/usuarios/auth/login',
        method: RequestMethod.POST,
      },
      {
        path: '/usuarios/auth/register',
        method: RequestMethod.POST
      },
    )
    .forRoutes('');
  }
}
