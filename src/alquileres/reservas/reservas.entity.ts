import { Usuarios } from "src/usuarios/usuarios.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Departamento } from "../departamentos/departamentos.entity";

export enum Estado {
    PENDING = "pendiente",
    ACCEPTED = "aceptada",
    REFUSED = "rechazada"
}

@Entity('reservas')
export class Reserva {
    //Ingreso Id
    @PrimaryGeneratedColumn('increment')
    id: number;

    //Fecha
    @Column({ type: 'date', nullable: false })
    desde: Date
    @Column({ type: 'date', nullable: false })
    hasta: Date

    //Usuario
    @ManyToOne(() => Usuarios, usuario => usuario.id)
    @JoinColumn({name: 'userId'})
    usuario: Usuarios;
    
    //Departamento
    @ManyToOne(() => Departamento, departamento => departamento.id)
    @JoinColumn({name: 'deptoId'})
    departamento: Departamento;

    //Estado
    @Column({ 
        type: 'enum',
        enum: Estado,
        default: Estado.PENDING
    })
    estado: Estado;
}