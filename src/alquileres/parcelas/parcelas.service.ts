import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parcela } from './parcelas.entity';
import { ParcelaDto } from './parcelas.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/paginator/pagination.dto';

@Injectable()
export class ParcelasService {
    constructor(
        @InjectRepository(Parcela)
        private readonly parcelaRepository: Repository<ParcelaDto>
    ) {}


    async getOne(id: number): Promise<ParcelaDto> {
        try {
            const parcela = await this.parcelaRepository.findOne({where: {id}});
        if (!parcela) throw new NotFoundException(`No encontramos ninguna parcela con id ${id}`)
            return parcela;
        } catch (err) {
            console.error(err)
      if (err instanceof QueryFailedError)
        throw new HttpException(`${err.name} ${err.driverError}`, 404);
      throw new HttpException(err.message, err.status)
        }
        
    }
    async getAll(paginationQuery: PaginationQueryDto): Promise<{
        data: ParcelaDto[];
        total: number;
        page: number;
        limit: number;
      }> {
        const {page = 1, limit = 10} = paginationQuery;
        try {
            const [parcelas, total] = await this.parcelaRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit
              })
            const parcela = await this.parcelaRepository.find();
        if (!parcela) throw new NotFoundException('No encontramos ninguna parcela')
            return {data: parcelas, total, page, limit};
        } catch (err) {
            console.error(err)
      if (err instanceof QueryFailedError)
        throw new HttpException(`${err.name} ${err.driverError}`, 404);
      throw new HttpException(err.message, err.status)
        }
        
    }
        //ocupamos la parcela
    async update(id:number) {

      try {
        const parcela = await this.parcelaRepository.findOne({where: {id}});
        if (!parcela) throw new NotFoundException(`No encontramos ninguna parcela con id ${id}`)
        await this.parcelaRepository.update(parcela, {ocupada: true});
        return parcela;
        

      }catch (err) {
        console.error(err);
        if (err instanceof QueryFailedError)
          throw new HttpException(`${err.name} ${err.driverError}`, 404);
        throw new HttpException(err.message, err.status);
      }
    }

    //desocupamos
    async downgrade(id:number) {

      try {
        const parcela = await this.parcelaRepository.findOne({where: {id}});
        if (!parcela) throw new NotFoundException('no encontramos ninguna parcela con ese id')
        await this.parcelaRepository.update(parcela, {ocupada: false} );
        return parcela;
        

      }catch (err) {
        console.error(err);
        if (err instanceof QueryFailedError)
          throw new HttpException(`${err.name} ${err.driverError}`, 404);
        throw new HttpException(err.message, err.status);
      }
    }

    
}
