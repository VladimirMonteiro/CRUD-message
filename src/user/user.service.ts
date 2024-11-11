import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {


  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }


  async create(createUserDto: CreateUserDto) {
    try {

      const user = {
        name: createUserDto.name,
        password: createUserDto.password,
        email: createUserDto.email
      }

      const newUser = await this.userRepository.create(user)
      await this.userRepository.save(newUser)

    } catch (error) {

      if(error.code === '23505'){
        throw new ConflictException('E-mail already used.')
      }

      throw error
    
    }
  }

  async findAll() {
    const users = await this.userRepository.find({order: {id: 'desc'}})
    return users
  }

  async findOne(id: number) {

    const user = await this.userRepository.findOneBy({id})

    if(!user) {
      throw new NotFoundException('user not found')
    }

    return user
   
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const userData = {
      name: updateUserDto.name,
      password: updateUserDto.password
    }


    const user = await this.userRepository.preload({id, ...userData})

    if(!user) {
      throw new NotFoundException('User not found')
    }

    return this.userRepository.save(user)


  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({id})

    if(!user) {
      throw new NotFoundException('user not found')
    }

    return this.userRepository.remove(user)
  }
}
