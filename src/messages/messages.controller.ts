import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

constructor(private readonly messageService: MessagesService) {}

  @Get()
  findAll() {
    return this.messageService.findAll()
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.messageService.findOne(id);
  }

  @Post('/create')
  create(@Body() message: any) {
    return this.messageService.create(message)
  }

  @Patch('/:id')
  update(@Body() body: any, @Param('id') id: number) {}

  @Delete('/:id')
  remove(@Param('id') id: number) {}
}
