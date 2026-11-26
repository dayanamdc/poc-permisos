import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRetryInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method.toLowerCase() === 'post') {
      if (request.url.toLowerCase().trim().includes('/api/')) {
        request = request.clone({
          params: request.params.append('retry', 'true'),
        });
      }
    }
    return next.handle(request);
  }
}
