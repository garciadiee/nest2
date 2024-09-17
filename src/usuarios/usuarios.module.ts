import { Body, HttpStatus, Module, Patch, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './usuarios.entity'; 
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { saveImagesToStorage } from './helpers/image-storage'
import { v4 as uuidv4 } from 'uuid';
const validMimeType = ['image/png', 'image/jpg', 'image/jpeg'];
import path = require ('path');
import { envs } from 'src/config/envs';


@Module({
  imports: [
    TypeOrmModule.forFeature([Usuarios]),
    JwtModule.register({
        secret: envs.jwt,
        signOptions: {
          expiresIn: '24h',
        },
      }),
    MulterModule.register({
      dest: './uploads',
      fileFilter:(req, file, callback) => {
        const allowedMimeTypes = validMimeType;
        allowedMimeTypes.includes(file.mimetype)
          ? callback(null, true)
          : callback(null, false);
      },
      storage: saveImagesToStorage({
        destination: './uploads/avatar',
        filename: (req, file, callback) => {
        const fileExtension: string = path.extname(file.originalname);
        const filename: string = uuidv4() + fileExtension;
        callback(null, filename);
      },
    }),
  }),
],
controllers: [UsuariosController],
providers: [UsuariosService, AuthService],
exports: [AuthService, UsuariosService],
})
export class UsuariosModule {}
