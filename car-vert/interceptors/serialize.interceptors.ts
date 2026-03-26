import {
    UseInterceptors, NestInterceptor, ExecutionContext, CallHandler, Injectable
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
    new(...args: any[]): {};
}

// for reusability, we can create a decorator that uses the SerializeInterceptor and pass the dto class to it
export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) { }

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // run something before a request is handled by the request handler
        // console.log('Im running before the handler', context);
        return handler.handle().pipe(
            map((data: any) => {
                // run something before the response is sent out
                console.log('Im running before response is sent out', data);
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true // this excludes all the properties that are not decorated with @Expose() in the UserDto class
                });
            })
        );
    }
}