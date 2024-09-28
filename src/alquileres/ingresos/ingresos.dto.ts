import { IsNotEmpty, IsOptional } from "class-validator";
import { ParcelaDto } from "src/alquileres/parcelas/parcelas.dto";
import { UsuarioDto } from "src/usuarios/usuarios.dto";

export class IngresoDto {

    id: number;

    @IsOptional()
    entrada: Date;

    @IsOptional()
    salida: Date;

    @IsNotEmpty()
    @IsNotEmpty()
    usuario: UsuarioDto

    @IsNotEmpty()
    parcela: ParcelaDto

}