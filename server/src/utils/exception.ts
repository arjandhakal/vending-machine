import { StatusCodes } from "http-status-codes";

export class HttpException extends Error {
  public statusCode: number;

  constructor(
    message: string = "Something went wrong",
    code = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this.statusCode = code;
    Object.setPrototypeOf(this, HttpException.prototype);
  }
}

export class BadRequestException extends HttpException {
  constructor(message = "Bad Request") {
    super(message, StatusCodes.BAD_REQUEST);
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}
