import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'



@Entity()
export default class Tool extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text', { nullable:true })
    name: string
    

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
    

}