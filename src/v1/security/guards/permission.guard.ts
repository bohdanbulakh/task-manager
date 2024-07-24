import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsService } from '../../api/services/permissions.service';
import { NoPermissionException } from '../../exceptions/no-permissions.exception';
import { PermissionUtils } from '../../utils/permission.utils';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor (
    private reflector: Reflector,
    private rolesService: PermissionsService,
  ) {}

  async canActivate (context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) return true;

    let permissions = this.reflector.get('permissions', context.getHandler());
    permissions = PermissionUtils.getPermissions(permissions, request);

    for (const permission of permissions) {
      const hasPermission = await this.rolesService.checkPermission(user.id, permission);
      if (!hasPermission) throw new NoPermissionException();
    }
    return true;
  }
}
