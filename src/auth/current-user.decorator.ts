import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { User } from '../user/models/user.entity';

export const CurrentUser = createParamDecorator<any, any, User>(
  (data, req: ExecutionContextHost) => {
    const handler = req.switchToHttp();
    const request = handler.getRequest();
    return request.user;
  },
);
