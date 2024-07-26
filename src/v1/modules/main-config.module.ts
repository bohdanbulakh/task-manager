import { Module } from '@nestjs/common';
import { MainConfigService } from '../config/main-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [MainConfigService],
  exports: [MainConfigService],
})
export class MainConfigModule extends ConfigModule {}
