import { ValidationOptions } from 'class-validator';

export function validationOptionsMsg (message: string, each?: boolean): ValidationOptions {
  return { message, each };
}
