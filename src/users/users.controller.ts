import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: [UserEntity] })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity, description: 'The user' })
  async getUserById(@Param('id') id: string) {
    return this.usersService.findById(Number(id));
  }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }
}
