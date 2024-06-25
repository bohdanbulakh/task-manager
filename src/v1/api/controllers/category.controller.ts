import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryByIdPipe } from '../pipes/category-by-id.pipe';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoriesExtendedResponse } from '../responses/categories-extended.response';
import { CategoryExtendedResponse } from '../responses/category-extended.response';
import { CurrentUser } from '../decorators/user.decorator';
import { JwtGuard } from '../../security/guards/jwt.guard';
import { ApiEndpoint } from '../../utils/documentation/api-endpoint.decorator';
import { WorkspaceByIdPipe } from '../pipes/workspace-by-id.pipe';

@ApiTags('Category')
@Controller({
  version: '1',
  path: 'category',
})
export class CategoryController {
  constructor (private categoryService: CategoryService) {}

  @ApiEndpoint({
    summary: 'Get all categories',
    okResponse: CategoriesExtendedResponse,
  })
  @Get()
  async getAll () {
    return this.categoryService.getAll();
  }

  @ApiEndpoint({
    summary: 'Get category by id',
    params: {
      name: 'categoryId',
      description: 'Id of the category',
    },
    okResponse: CategoryExtendedResponse,
    badRequestResponse: `
    InvalidEntityIdException: 
      Category with such id not found`,
  })
  @Get('/:categoryId')
  async getById (@Param('categoryId', CategoryByIdPipe) categoryId: string) {
    return this.categoryService.getById(categoryId);
  }

  @ApiBearerAuth()
  @ApiEndpoint({
    summary: 'Create category',
    guards: JwtGuard,
    okResponse: CategoriesExtendedResponse,
    badRequestResponse: `
    InvalidBodyException: 
      CategoryName cannot be empty
      CategoryName must be a string
      CategoryName length must be between 1 and 20
      Description must be a string

    UnauthorizedException:
      Unauthorized`,
  })
  @Post()
  async create (
    @CurrentUser('id') userId: string,
    @Body(WorkspaceByIdPipe) body: CreateCategoryDto
  ) {
    return this.categoryService.create(userId, body);
  }

  @ApiBearerAuth()
  @ApiEndpoint({
    summary: 'Update category by id',
    guards: JwtGuard,
    params: {
      name: 'categoryId',
      description: 'Id of the category',
    },
    okResponse: CategoryExtendedResponse,
    badRequestResponse: `
    InvalidBodyException:
      CategoryName must be a string
      CategoryName length must be between 1 and 20
      Description must be a string

    InvalidEntityIdException: 
      Category with such id not found

    UnauthorizedException:
      Unauthorized`,
  })
  @Patch('/:categoryId')
  async updateById (
    @Param('categoryId', CategoryByIdPipe) categoryId: string,
    @Body(WorkspaceByIdPipe) body: UpdateCategoryDto,
  ) {
    return this.categoryService.updateById(categoryId, body);
  }

  @ApiBearerAuth()
  @ApiEndpoint({
    summary: 'Delete category by id',
    guards: JwtGuard,
    params: {
      name: 'categoryId',
      description: 'Id of the category',
    },
    okResponse: CategoryExtendedResponse,
    badRequestResponse: `
    InvalidEntityIdException: 
      Category with such id not found

    UnauthorizedException:
      Unauthorized`,
  })
  @Delete('/:categoryId')
  async deleteById (@Param('categoryId', CategoryByIdPipe) categoryId: string) {
    return this.categoryService.deleteById(categoryId);
  }
}
