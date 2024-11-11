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
  Query,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';

@Controller('messages')
@UsePipes(ParseIntIdPipe)
@UseInterceptors(AddHeaderInterceptor)
export class MessagesController {

constructor(private readonly messageService: MessagesService) {}

  @Get()
  async findAll(@Query() paginagion: PaginationDto) {
    const {limit = 10, offset = 0} = paginagion
    const messages =  await this.messageService.findAll()
    return messages
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
