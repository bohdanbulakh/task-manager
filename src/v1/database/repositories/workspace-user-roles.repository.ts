import { PrismaService } from '../prisma.service';
import { Repository } from '../../utils/globals';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkspaceUserRolesRepository implements Repository {
  constructor (private prisma: PrismaService) {}

  async findMany (where?: Prisma.WorkspaceUserRoleWhereInput) {
    return this.prisma.workspaceUserRole.findMany({ where });
  }

  async find (where?: Prisma.WorkspaceUserRoleWhereInput, include?: Prisma.WorkspaceUserRoleInclude) {
    return this.prisma.workspaceUserRole.findFirst({
      where,
      include,
    });
  }

  async findById (workspaceUserId: string) {
    return this.prisma.workspaceUserRole.findFirst({
      where: { workspaceUserId },
    });
  }

  async create (data: Prisma.WorkspaceUserRoleUncheckedCreateInput | Prisma.WorkspaceUserRoleCreateInput) {
    return this.prisma.workspaceUserRole.create({
      data,
    });
  }

  async upsert (where: Prisma.WorkspaceUserRoleWhereUniqueInput, data: Prisma.WorkspaceUserRoleUncheckedCreateInput) {
    return this.prisma.workspaceUserRole.upsert({
      where,
      update: data,
      create: data,
    });
  }

  async updateById (workspaceUserId: string, data: Prisma.WorkspaceUserRoleUncheckedUpdateInput) {
    return this.prisma.workspaceUserRole.update({
      where: { workspaceUserId },
      data,
    });
  }

  async updateByWhere (where: Prisma.WorkspaceUserRoleWhereUniqueInput, data: Prisma.WorkspaceUserRoleUncheckedUpdateInput) {
    return this.prisma.workspaceUserRole.update({
      where,
      data,
    });
  }

  async deleteById (workspaceUserId: string) {
    return this.prisma.workspaceUserRole.delete({
      where: { workspaceUserId },
    });
  }

  async delete (where: Prisma.WorkspaceUserRoleWhereUniqueInput) {
    return this.prisma.workspaceUserRole.delete({
      where,
    });
  }
}
