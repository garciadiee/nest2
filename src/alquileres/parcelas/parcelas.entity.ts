import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('parcelas')
export class Parcela {
    //Parcela Id
    @PrimaryGeneratedColumn('increment')
    id: number;

    //Parcela name
    @Column({ type: 'varchar', nullable: true })
    nombre: string;

    //Parcela Status
    @Column({ type: 'boolean', default: false})
    ocupada: boolean


}