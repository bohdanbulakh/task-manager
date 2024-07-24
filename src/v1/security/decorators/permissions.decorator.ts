import { SetMetadata } from '@nestjs/common';
import { makeArray } from '../../utils/globals';

export const SetPermissions = (permission: string | string[]) => SetMetadata('permissions', makeArray(permission));
