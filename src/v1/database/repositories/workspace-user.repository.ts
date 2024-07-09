import { Repository } from '../../utils/globals';
import { Prisma, WorkspaceUser } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkspaceUserRepository implements Repository<WorkspaceUser> {
  constructor (private prisma: PrismaService) {}

  async findMany () {
    return this.prisma.workspaceUser.findMany();
  }

  async findWhere (where?: Prisma.WorkspaceUserWhereInput) {
    return this.prisma.workspaceUser.findFirst({
      where,
    });
  }

  async findById (id: string) {
    return this.prisma.workspaceUser.findFirst({
      where: { id },
    });
  }

  async create (data: Prisma.WorkspaceUserUncheckedCreateInput, include?: Prisma.WorkspaceUserInclude) {
    return this.prisma.workspaceUser.create({
      data,
      include,
    });
  }

  async updateById (id: string, data: Prisma.WorkspaceUserUpdateInput) {
    return this.prisma.workspaceUser.update({
      where: { id },
      data,
    });
  }

  async updateUniqueWhere (
    where: Prisma.WorkspaceUserUserIdWorkspaceIdCompoundUniqueInput,
    data: Prisma.WorkspaceUserUpdateInput,
    include?: Prisma.WorkspaceUserInclude
  ) {
    return this.prisma.workspaceUser.update({
      where: {
        userId_workspaceId: where,
      },
      data,
      include,
    });
  }

  async deleteById (id: string) {
    return this.prisma.workspaceUser.delete({
      where: { id },
    });
  }

  async deleteUniqueWhere (
    where: Prisma.WorkspaceUserUserIdWorkspaceIdCompoundUniqueInput,
    include?: Prisma.WorkspaceUserInclude
  ) {
    return this.prisma.workspaceUser.delete({
      where: {
        userId_workspaceId: where,
      },
      include,
    });
  }

}
