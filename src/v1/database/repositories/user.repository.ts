import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';
import { Repository } from '../../utils/globals';

@Injectable()
export class UserRepository implements Repository<User> {
  constructor (private prisma: PrismaService) {}

  async findMany (include?: Prisma.UserInclude) {
    return this.prisma.user.findMany({
      include,
    });
  }

  async findById (id: string, include?:Prisma.UserInclude) {
    return this.prisma.user.findFirst({
      where: { id },
      include,
    });
  }

  async findWhere (where: Prisma.UserWhereInput, include?:Prisma.UserInclude) {
    return this.prisma.user.findFirst({
      where,
      include,
    });
  }

  async create (data: Prisma.UserUncheckedCreateInput) {
    return this.prisma.user.create({ data });
  }

  async updateById (id: string, data: Prisma.UserUncheckedUpdateInput, include?:Prisma.UserInclude) {
    return this.prisma.user.update({
      where: { id },
      data,
      include,
    });
  }

  async deleteById (id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
