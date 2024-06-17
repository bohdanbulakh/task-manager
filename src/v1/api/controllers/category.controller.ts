import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryByIdPipe } from '../pipes/category-by-id.pipe';
import { CategoryResponse } from '../responses/category.response';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoriesWithTasksResponse } from '../responses/categories-with-tasks.response';
import { CategoryWithTasksResponse } from '../responses/category-with-tasks.response';
import { CurrentUser } from '../decorators/user.decorator';
import { JwtGuard } from '../../security/guards/jwt.guard';

@ApiTags('Category')
@Controller({
  version: '1',
  path: 'category',
})
export class CategoryController {
  constructor (private categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ type: CategoriesWithTasksResponse })
  @Get()
  async getAll () {
    return this.categoryService.getAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get user categories' })
  @ApiOkResponse({ type: CategoriesWithTasksResponse })
  @Get('/userCategories')
  getUserCategories (
    @CurrentUser('id') userId: string
  ) {
    return this.categoryService.getAll(userId);
  }

  @ApiOperation({ summary: 'Get category by id' })
  @ApiParam({
    name: 'categoryId',
    description: 'Id of the category',
  })
  @ApiOkResponse({ type: CategoryWithTasksResponse })
  @ApiBadRequestResponse({
    description: `
    InvalidEntityIdException: 
      Category with such id not found`,
  })
  @Get('/:categoryId')
  async getById (@Param('categoryId', CategoryByIdPipe) categoryId: string) {
    return this.categoryService.getById(categoryId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Create category' })
  @ApiOkResponse({ type: CategoryResponse })
  @ApiBadRequestResponse({
    description: `
    InvalidBodyException: 
      CategoryName cannot be empty
      CategoryName must be a string
      CategoryName length must be between 1 and 20
      Description must be a string`,
  })
  @Post()
  async create (
    @CurrentUser('id') userId: string,
    @Body() body: CreateCategoryDto
  ) {
    return this.categoryService.create(userId, body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Update category by id' })
  @ApiParam({
    name: 'categoryId',
    description: 'Id of the category',
  })
  @ApiOkResponse({ type: CategoryResponse })
  @ApiBadRequestResponse({
    description: `
    InvalidBodyException:
      CategoryName must be a string
      CategoryName length must be between 1 and 20
      Description must be a string
      
    InvalidEntityIdException: 
      Category with such id not found`,
  })
  @Patch('/:categoryId')
  async updateById (
    @Param('categoryId', CategoryByIdPipe) categoryId: string,
    @Body() body: UpdateCategoryDto,
  ) {
    return this.categoryService.updateById(categoryId, body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Delete category by id' })
  @ApiParam({
    name: 'categoryId',
    description: 'Id of the category',
  })
  @ApiOkResponse({ type: CategoryResponse })
  @ApiBadRequestResponse({
    description: `
    InvalidEntityIdException: 
      Category with such id not found`,
  })
  @Delete('/:categoryId')
  async deleteById (@Param('categoryId', CategoryByIdPipe) categoryId: string) {
    return this.categoryService.deleteById(categoryId);
  }
}
