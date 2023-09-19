import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {
  }

  private readonly model = this.prismaService.user;

  async create(createUserDto: CreateUserDto) {

    if (await this.model.findFirst({
      where: {
        email: createUserDto.email
      }
    })) {
      throw new ConflictException('User already exists');
    }

    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    return this.model.create({
      data: createUserDto,
    });
  }

  findAll(): Promise<User[]> {
    return this.model.findMany();
  }

  findOne(id: number): Promise<User> {
    return this.model.findFirst({
      where: {
        id,
      },
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.model.findFirst({
      where: {
        email,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.model.delete({
      where: {
        id,
      },
    });
  }
}
