import { UserEntity } from '@ivt/a-users';
import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data, req): UserEntity => {
    return req.user;
  }
);
