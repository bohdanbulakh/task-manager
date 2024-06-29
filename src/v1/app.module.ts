import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma.module';
import { TaskModule } from './modules/task.module';
import { CategoryModule } from './modules/category.module';
import { MappersModule } from './modules/mappers.module';
import { AuthModule } from './modules/auth.module';
import { WorkspaceModule } from './modules/workspace.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    PrismaModule,
    MappersModule,
    AuthModule,
    UserModule,
    WorkspaceModule,
    CategoryModule,
    TaskModule,
  ],
})
export class AppModule {}
