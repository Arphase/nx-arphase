import { UserEntity } from '@ivt/a-state';
import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data, req): UserEntity => {
    return req.user;
  }
);
