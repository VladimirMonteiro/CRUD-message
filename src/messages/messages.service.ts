import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
    private lastId = 1
    private messages: Message[] = [
        {
            id: 1,
            text: "este é um recado test",
            of: "pedro",
            from: "mariana",
            read: false,
            date: new Date()
        }
    ]

    findAll() {
        return this.messages
    }

    findOne(id: number) {
        const message = this.messages.find(message => message.id === +id)
        console.log(message)
        return message
    }

    create(message: any) {
        this.lastId++
        const id = this.lastId

        const newMessage = {
            id,
            ...message
        }

        this.messages.push(newMessage)

        return newMessage

    }

}
