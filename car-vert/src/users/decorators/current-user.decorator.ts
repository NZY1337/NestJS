import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../users.service';

const getUserSession = async (data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser; // this is set in the CurrentUserInterceptor, so we can access it here
};

export const CurrentUser = createParamDecorator(getUserSession);
