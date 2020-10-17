import { HttpStatusCodes } from '../enums';

export interface IvtHttpErrorResponse {
  error: string;
  message: string;
  statusCode: HttpStatusCodes;
}
