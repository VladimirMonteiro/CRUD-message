import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly userService: UserService
  ) {}

  async findAll(paginagion?: PaginationDto) {
    const {limit = 10, offset = 0 } = paginagion



    const messages = await this.messageRepository.find({
      take: limit,
      skip: offset,
      relations: ['of', 'from'],
      order: { id: 'desc'},
      select: {
        of: {
          id: true,
          name: true
        },
        from: {
          id: true,
          name: true
        }
      }
    });
    return messages;
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({ where: { id } });

    if (!message) {
      throw new HttpException('Message not found.', HttpStatus.NOT_FOUND);
    }

    return message;
  }

  async create(message: CreateMessageDto) {

    const {ofId, fromId} = message

    const of = await this.userService.findOne(ofId)

    const from = await this.userService.findOne(fromId)



    const newMessage = {
      text: message.text,
      of,
      from,
      read: false,
      date: new Date(),
    };

    await this.messageRepository.save(newMessage);

    return {
      ...newMessage,
      of: {
        id: newMessage.of.id,
        name: newMessage.of.name
      },
      from: {
        id: newMessage.from.id,
        name: newMessage.from.name
      }
    };
  }

  async update(body: UpdateMessageDto, id: number) {
   const message = await this.findOne(id)

   message.text = body?.text ?? message.text
   message.read = body?.read ?? message.read


    await this.messageRepository.save(message);

    return message;
  }

  async remove(id: number) {
    const messageExists = await this.messageRepository.findOneBy({ id });

    if (!messageExists) {
      throw new HttpException('Message not found.', HttpStatus.NOT_FOUND);
    }

    await this.messageRepository.remove(messageExists);

    return 'message deleted';
  }
}
