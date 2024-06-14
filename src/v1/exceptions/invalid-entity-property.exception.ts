import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidEntityPropertyException extends HttpException {
  constructor (entity: string, property: string) {
    super(`${entity} with such ${property} is not found`, HttpStatus.BAD_REQUEST);
  }
}
