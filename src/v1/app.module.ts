import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma.module';
import { TaskModule } from './modules/task.module';
import { CategoryModule } from './modules/category.module';
import { MappersModule } from './modules/mappers.module';

@Module({
  imports: [PrismaModule, TaskModule, CategoryModule, MappersModule],
})
export class AppModule {}
