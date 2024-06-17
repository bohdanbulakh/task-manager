import { Module } from '@nestjs/common';
import { CategoryController } from '../api/controllers/category.controller';
import { CategoryService } from '../api/services/category.service';
import { CategoryByIdPipe } from '../api/pipes/category-by-id.pipe';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryByIdPipe],
})
export class CategoryModule {}
