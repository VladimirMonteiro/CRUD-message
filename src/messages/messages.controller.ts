import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {

constructor(private readonly messageService: MessagesService) {}

  @Get()
  async findAll() {
    return await this.messageService.findAll()
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.messageService.findOne(id);
  }

  @Post('/create')
  create(@Body() body: CreateMessageDto) {
    return this.messageService.create(body)
  }

  @Patch('/:id')
  update(@Body() body: UpdateMessageDto, @Param('id', ParseIntPipe) id: number) {
    return this.messageService.update(body, id)
  }

  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.messageService.remove(id)

  }
}
