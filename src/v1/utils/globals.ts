import { ValidationOptions } from 'class-validator';

export function validationOptionsMsg (message: string, each?: boolean): ValidationOptions {
  return { message, each };
}

export function makeArray (value: any | any[]) {
  return Array.isArray(value) ? value : [value];
}

export interface Repository<Entity=object> {
  findMany(): Promise<Entity[]>;
  findById(id: string): Promise<Entity>;
  create(data: object): Promise<Entity>;
  updateById(id: string, data: object): Promise<Entity>;
  deleteById(id: string): Promise<Entity>;
}
