import { HttpStatusCodes } from '../enums/http-status-codes.enum';

export interface ApsHttpErrorResponse {
  error: string;
  message: string;
  statusCode: HttpStatusCodes;
}
