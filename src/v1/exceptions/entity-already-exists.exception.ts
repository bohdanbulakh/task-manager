import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityAlreadyExistsException extends HttpException {
  constructor (entity: string, property: string) {
    super(`${entity} with such ${property} already exists`, HttpStatus.BAD_REQUEST);
  }
}
