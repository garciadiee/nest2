import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('departamentos')
export class Departamento {
    //Depto Id
    @PrimaryGeneratedColumn('increment')
    id: number;

    //Name
    @Column({ type: 'varchar', nullable: true })
    nombre: string
}