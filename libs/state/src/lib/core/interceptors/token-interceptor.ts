import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../../auth';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private authService: AuthService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.show();
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
    return next
      .handle(request)
      .pipe(finalize(() => this.loadingService.hide()));
  }
}
