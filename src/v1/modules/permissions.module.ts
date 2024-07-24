import { Module } from '@nestjs/common';
import { PermissionsService } from '../api/services/permissions.service';

@Module({
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
