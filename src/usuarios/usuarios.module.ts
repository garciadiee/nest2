import { Body, HttpStatus, Module, Patch, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './usuarios.entity'; 
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { FilesInterceptor, MulterModule } from '@nestjs/platform-express';
import { saveImagesToStorage } from './helpers/image-storage';
import { UsuarioDto } from './usuarios.dto';


@Module({
  imports: [
    TypeOrmModule.forFeature([Usuarios]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: ConfigService.get('JWT_SEED'),
        singOptions: {
          expiresIn: '24h',
        },
      }),
    }),
    MulterModule.register({
      dest: './uploads',
      fileFilter: saveImagesToStorage('avatar').fileFilter,
      storage: saveImagesToStorage('avatar').storage,
    }),
    
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, AuthService],
  exports: [AuthService, UsuariosService],
})
export class UsuariosModule {}
