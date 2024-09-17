import { BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    Res,
    UploadedFiles,
    UseInterceptors,} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioDto } from './usuarios.dto';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PaginationQueryDto } from 'src/common/paginator/pagination.dto';


@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly service: UsuariosService) {}

@Post()
async register(@Body() usuario: UsuarioDto, @Res() response: Response) {
        const result = await this.service.register(usuario);
        response
            .status(HttpStatus.CREATED)
            .json({ ok: true, result, msg: 'creado'});
    }

@Post('auth/login')
async login(
    @Body() usuario: { email: string; pass: string },
    @Res() res: Response,
){
    
}

@Patch(':id')
  @UseInterceptors(FilesInterceptor('files'))
  async updateUser(
    @Param('id') id: number,
    @Body() user: Partial<UsuarioDto>,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    const result = await this.service.updateUser(id, user, files);
    res.status(HttpStatus.OK).json({ok: true, result, msg: 'approved'});
  
    [
      {
        fieldname: 'file',
        originalname: 'test.png',
        encoding: '7bit',
        mimetype: 'image/png',
      },
    ];
  }

  
  @Delete(':id')
  async deleteUser(@Param('id') id: number, @Res() res: Response) {
    const result = await this.service.deleteUser(id);
    res.status(HttpStatus.OK).json({ ok: true, result });
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.service.getOne(id);
  }

  @Get()
  async getAll(@Query() paginationQuery: PaginationQueryDto) {
    return await this.service.getAll(paginationQuery);
  }
}