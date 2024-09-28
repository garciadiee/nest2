import { Body, Controller, Get, Headers, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Res } from '@nestjs/common';

import { PaginationQueryDto } from 'src/common/paginator/pagination.dto';
import { Response } from 'express';
import { ReservasService } from './reservas.service';


@Controller('reservas')
export class ReservasController {

    constructor(private readonly service: ReservasService) { }

    //New reserva
    @Post('reservar')
    async solicitarReserva(
        @Body('desde') desde: Date,
        @Body('hasta') hasta: Date,
        @Body('usuario') usuarioId: number,
        @Body('departamento') deptoId: number,
    ) {
        const result = this.service.reservar(desde, hasta, usuarioId, deptoId);
        return result;
    }


    @Get(':id')
    async getOne(@Param('id') id: number, @Res() response: Response) {
        const reserva = await this.service.getOne(id);
        response.status(HttpStatus.OK).json({ ok: true, reserva, msg: 'approved' })
    }

    //reservas realizadas
    @Get('/')
    async getAll(@Query() paginationQuery: PaginationQueryDto, @Res() response: Response) {
        const reservas = await this.service.getAll(paginationQuery);
        response.status(HttpStatus.OK).json({ ok: true, reservas, msg: 'approved' })
    }

    @Patch(':id/aceptar')
    async acceptReserva(
      @Param('id', ParseIntPipe) id: number,
      @Headers('authorization') token: string,
    ) {
      try {
        const splitString = token.split('Bearer ')[0];
        await this.service.acceptRequest(id, splitString);
      } catch (error) {
        return error;
      }
    }

    @Patch(':id/rechazar')
    async rejectReserva(
      @Param('id', ParseIntPipe) id: number,
      @Headers('authorization') token: string,
    ) {
      try {
        const splitString = token.split('Bearer ')[0];
        await this.service.rejectRequest(id, splitString);
      } catch (error) {
        return error;
      }
    }

  }