import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root' })
export class LoadingInterceptorService implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<null>, next: HttpHandler): Observable<HttpEvent<null>> {
    this.loadingService.show(request.method);
    return next.handle(request).pipe(finalize(() => this.loadingService.hide(request.method)));
  }
}
