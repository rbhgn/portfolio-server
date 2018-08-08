import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import Tool from '../tools/entity';


@Entity()
export default class Project extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text', { nullable:true })
    title: string

    @Column('text', { nullable:true })
    description: string

    @Column('text', { nullable:true, default: "http://www.angrybirdsnest.com/wp-content/uploads/2011/09/Angry-Birds-Seasons-Mooncake-Festival-Level-2-17.jpg" })
    img: string

    @Column('text', { nullable:true })
    githubRepository: string

    @Column('text', { nullable:true })
    previewUrl: string

    @Column('int', { default: 0 })
    likes: number

    @Column('int', { default: 0 })
    web: number

    @Column('int', { default: 0 })
    gitHub: number

    @ManyToMany(() => Tool)
    @JoinTable()
    tools: Tool[];

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
    

}