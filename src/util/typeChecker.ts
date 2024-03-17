import { ValidationError } from '../error/codeError.js';

type GenericValue = string | object | number | boolean;

export function typeCheck(field: GenericValue, type: string) {
  if (typeof field !== type) {
    return {
      code_err: ValidationError.INVALID_TYPE,
      message: `Invalid type for property "${field}".Expected: "${type}" - Received: ${typeof field}`
    };
  }
}