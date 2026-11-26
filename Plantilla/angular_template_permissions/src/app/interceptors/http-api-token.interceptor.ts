import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class HttpApiTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.authService.accessToken;
    if (!accessToken) {
      return next.handle(request);
    }
    const authHeader = `Bearer ${accessToken}`;
    const nextReq = request.clone({
      setHeaders: {
        Authorization: authHeader,
      },
    });

    return next.handle(nextReq);
  }
}
