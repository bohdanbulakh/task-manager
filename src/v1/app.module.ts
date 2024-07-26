import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma.module';
import { TaskModule } from './modules/task.module';
import { CategoryModule } from './modules/category.module';
import { MappersModule } from './modules/mappers.module';
import { AuthModule } from './modules/auth.module';
import { WorkspaceModule } from './modules/workspace.module';
import { UserModule } from './modules/user.module';
import { PermissionsModule } from './modules/permissions.module';
import { PipesModule } from './modules/pipes.module';
import { MainConfigModule } from './modules/main-config.module';
import MainConfig from './config/main.config';

@Module({
  imports: [
    PrismaModule,
    MappersModule,
    PermissionsModule,
    PipesModule,
    AuthModule,
    UserModule,
    WorkspaceModule,
    CategoryModule,
    TaskModule,
    MainConfigModule.forRoot({
      isGlobal: true,
      load: [MainConfig],
    }),
  ],
})
export class AppModule {}
