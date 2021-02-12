import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpStatusCodes, IvtHttpErrorResponse } from '@ivt/c-data';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { AuthService, fromAuth } from '../../auth';
import { IvtState } from '../../state';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private authService: AuthService,
    private messageService: NzMessageService,
    private store: Store<IvtState>
  ) {}
  intercept(request: HttpRequest<null>, next: HttpHandler): Observable<HttpEvent<null>> {
    this.loadingService.show();
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error.error);
        return throwError(error);
      }),
      finalize(() => this.loadingService.hide())
    );
  }

  handleError(error: IvtHttpErrorResponse): void {
    if (error.statusCode === HttpStatusCodes.Unauthorized) {
      this.store.dispatch(fromAuth.actions.logout());
    }
    this.messageService.error(`${error.message}`);
  }
}
