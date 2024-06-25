import { ValidationOptions } from 'class-validator';

export function validationOptionsMsg (message: string, each?: boolean): ValidationOptions {
  return { message, each };
}

export interface Repository<Entity=object> {
  findMany(): Promise<Entity[]>;
  findById(id: string): Promise<Entity>;
  create(data: object): Promise<Entity>;
  updateById(id: string, data: object): Promise<Entity>;
  deleteById(id: string): Promise<Entity>;
}
