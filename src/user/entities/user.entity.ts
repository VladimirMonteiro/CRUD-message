import { IsEmail } from "class-validator";
import { Message } from "src/messages/entities/message.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class User {


    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    @IsEmail()
    email: string

    @Column({length: 255})
    password: string

    @Column({length: 255})
    name: string

    @OneToMany(() => Message, message => message.of)
    sendMessages: Message[]

    @OneToMany(() => Message, message => message.from)
    getMessages: Message[]

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date
    

}
