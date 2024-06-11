import { Global, Module } from '@nestjs/common';
import { TaskMapper } from '../mappers/task.mapper';

@Global()
@Module({
  providers: [TaskMapper],
  exports: [TaskMapper],
})
export class MappersModule {}
