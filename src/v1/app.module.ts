import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma.module';
import { TaskModule } from './modules/task.module';

@Module({
  imports: [PrismaModule, TaskModule],
})
export class AppModule {}
