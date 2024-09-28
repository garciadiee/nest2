import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { PaginationQueryDto } from 'src/common/paginator/pagination.dto';
import { Response } from 'express';

@Controller('ingresos')
export class IngresosController {

    constructor(private readonly service: IngresosService) { }

    //Cargar ingreso
    @Post('entrada')
    async ocuparParcela(
        @Body('usuarioId') usuarioId: number,
        @Body('parcelaId') parcelaId: number,
    ) {
        const result = this.service.ocuparParcela(usuarioId, parcelaId);
        return result;
    }


    //Cargar salida
    @Post('salida')
    async desocuparParcela(
        @Body('parcelaId') parcelaId: number,
        @Body('usuarioId') usuarioId: number,
        @Body('ingresoId') ingresoId: number,
    ) {
        const result = this.service.desocuparParcela(parcelaId, usuarioId, ingresoId);
        return result;
    }
    async update(){

        
    }

    //Get ingreso
    @Get(':id')
    async getOne(@Param('id') id: number, @Res() response: Response) {
        const ingreso = await this.service.getOne(id);
        response.status(HttpStatus.OK).json({ ok: true, ingreso, msg: 'approved' })
    }

    //Lista Ingreso
    @Get('/')
    async getAll(@Query() paginationQuery: PaginationQueryDto, @Res() response: Response) {
        const ingresos = await this.service.getAll(paginationQuery);
        response.status(HttpStatus.OK).json({ ok: true, ingresos, msg: 'approved' })
    }
}