import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';
import { Repository } from '../../utils/globals';

@Injectable()
export class UserRepository implements Repository<User> {
  constructor (private prisma: PrismaService) {}

  async findMany () {
    return this.prisma.user.findMany();
  }

  async findById (id: string) {
    return this.prisma.user.findFirst({ where: { id } });
  }

  async findWhere (where: Prisma.UserWhereInput) {
    return this.prisma.user.findFirst({ where });
  }

  async create (data: Prisma.UserUncheckedCreateInput) {
    return this.prisma.user.create({ data });
  }

  async updateById (id: string, data: Prisma.UserUncheckedUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteById (id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
