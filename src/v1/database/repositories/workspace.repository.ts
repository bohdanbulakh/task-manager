import { Injectable } from '@nestjs/common';
import { Repository } from '../../utils/globals';
import { PrismaService } from '../prisma.service';
import { Prisma, Workspace } from '@prisma/client';

@Injectable()
export class WorkspaceRepository implements Repository<Workspace> {
  constructor (private prisma: PrismaService) {}

  async findMany (where?: Prisma.WorkspaceWhereInput) {
    return this.prisma.workspace.findMany({
      where,
    });
  }

  async findById (id: string) {
    return this.prisma.workspace.findFirst({
      where: { id },
    });
  }

  async create (data: Prisma.WorkspaceCreateInput) {
    return this.prisma.workspace.create({ data });
  }

  async updateById (id: string, data: Prisma.WorkspaceUpdateInput, include?: Prisma.WorkspaceInclude) {
    return this.prisma.workspace.update({
      where: { id },
      data,
      include,
    });
  }

  async deleteById (id: string) {
    return this.prisma.workspace.delete({
      where: { id },
    });
  }
}
