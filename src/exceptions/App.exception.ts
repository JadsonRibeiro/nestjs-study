import { HttpStatus } from '@nestjs/common';

// https://javascript.info/custom-errors
// https://bobbyhadz.com/blog/typescript-extend-error-class

export class AppException extends Error {
  errorCode: string | undefined = undefined;
  statusCode: HttpStatus;

  constructor(message: string, statusCode: HttpStatus, errorCode?: string) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}
