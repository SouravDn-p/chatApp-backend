import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseData<T> {
  data: T;
}

export interface FormattedResponse<T> {
  statusCode: number;
  timestamp: string;
  path: string;
  data?: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, FormattedResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<FormattedResponse<T>> {
    const httpCtx = context.switchToHttp();
    const response = httpCtx.getResponse<Response>();
    const request = httpCtx.getRequest<Request>();
    
    return next.handle().pipe(
      map((data: T) => ({
        statusCode: response.statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...(data !== undefined && data !== null && { data }),
      })),
    );
  }
}
