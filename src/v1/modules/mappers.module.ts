import { Global, Module } from '@nestjs/common';
import { TaskMapper } from '../mappers/task.mapper';
import { CategoryMapper } from '../mappers/category.mapper';

@Global()
@Module({
  providers: [
    TaskMapper,
    CategoryMapper,
  ],
  exports: [
    TaskMapper,
    CategoryMapper,
  ],
})
export class MappersModule {}
