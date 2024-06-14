import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma.module';
import { TaskModule } from './modules/task.module';
import { CategoryModule } from './modules/category.module';
import { MappersModule } from './modules/mappers.module';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [
    PrismaModule,
    TaskModule,
    CategoryModule,
    MappersModule,
    AuthModule,
  ],
})
export class AppModule {}
