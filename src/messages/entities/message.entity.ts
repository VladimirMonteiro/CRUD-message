import { User } from "src/user/entities/user.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"


@Entity('message')
export class Message {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 255})
    text: string

    @ManyToOne(() => User, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'of_user_id'})
    of: User

    @ManyToOne(()=> User, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'from_user_id'})
    from: User

    @Column({default: false})
    read: boolean

    @Column()
    date: Date
}