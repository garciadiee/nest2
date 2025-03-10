import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class Usuarios {
    
@PrimaryGeneratedColumn('increment')
id: number;

@Column({ type: 'varchar', nullable: true, length: 255 })
nombre: string;

@Column({ type: 'varchar', nullable: false, unique: true, length: 255 })
email: string;

@Column({ type: 'varchar', nullable: false, length:255})
password: string;

@Column({ type: 'varchar', nullable: false, length: 255 })
avatar: string;

@Column({ type: 'bool', default: true })
isActive: boolean;

}





