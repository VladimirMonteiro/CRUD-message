import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { read } from 'fs';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {

    constructor(@InjectRepository(Message) private readonly messageRepository: Repository<Message>) {}

    async findAll() {
        const messages = await this.messageRepository.find()
        return messages
    }

    async findOne(id: number) {
        const message = await this.messageRepository.findOne({where: { id }})

        if(!message) {
            throw new HttpException('Message not found.', HttpStatus.NOT_FOUND)
        }
       
        return message
    }

    async create(message: CreateMessageDto) {
    
        const newMessage = {
            ...message,
            read: false,
            date: new Date()
        }

        await this.messageRepository.save(newMessage)

        return newMessage

    }

    async update(body: UpdateMessageDto, id: number) {

        const message = await this.messageRepository.preload({id, ...body})

        if(!message) {
            throw new HttpException('Message not found', HttpStatus.NOT_FOUND)
        }

       await this.messageRepository.save(message)

       return message


    }

    async remove(id: number) {
        const messageExists = await this.messageRepository.findOneBy({id})
       

        if(!messageExists) {
            throw new HttpException('Message not found.', HttpStatus.NOT_FOUND)
        }

        await this.messageRepository.remove(messageExists)

        return 'message deleted'

    }

}
