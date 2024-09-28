import { Parcela } from "src/alquileres/parcelas/parcelas.entity";
import { Usuarios } from "src/usuarios/usuarios.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ingresos')
export class Ingreso {
    //IngresoId
    @PrimaryGeneratedColumn('increment')
    id: number;


    @Column({ type: 'date', nullable: false })
    entrada: Date
    @Column({ type: 'date', nullable: true })
    salida: Date

    //Identificador de Usuario
    @ManyToOne(() => Usuarios, usuario => usuario.id)
    @JoinColumn({name: 'userId'})
    usuario: Usuarios;
    
    //Identificador de Parcela
    @ManyToOne(() => Parcela, parcela => parcela.id)
    @JoinColumn({name: 'parcelaId'})
    parcela: Parcela;
}