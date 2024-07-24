import { Request } from 'express';
import { NoPermissionException } from '../exceptions/no-permissions.exception';
import { DataNotFoundException } from '../exceptions/data-not-found.exception';
import { RequestUtils } from './request.utils';

export class PermissionUtils {
  static getPermissions (permissions: string[], request: Request): string[] {
    return permissions.map((permission: string) => this.getPermission(permission, request));
  }

  private static getPermission (permission: string, request: Request): string {
    return permission
      .split(':')
      .map((part) => this.getPart(part, request))
      .join(':');
  }

  private static getPart (part: string, request: Request): string {
    if (part.startsWith('$')) {
      const newPart = RequestUtils.get(request, part.slice(1));
      if (!newPart) {
        throw new NoPermissionException();
      }
      return newPart;
    }

    return part;
  }

  static makePermissions (permissions: string[], values: object): string[] {
    return permissions.map((permission: string) => this.makePermission(permission, values));
  }

  static makePermission (permission: string, values: object): string {
    return permission
      .split(':')
      .map((part) => this.makePermissionPart(part, values))
      .join(':');
  }

  private static makePermissionPart (part: string, values: object): string {
    if (!part.startsWith('$')) {
      return part;
    }

    const newPart = values[part.slice(1)];
    if (!newPart) {
      throw new DataNotFoundException();
    }
    return newPart;
  }
}
