import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  findById(id: number) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  update(id: number, updateProductDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: id },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id: id } });
  }
}
