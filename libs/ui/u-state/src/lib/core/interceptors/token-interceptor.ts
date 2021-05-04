import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpStatusCodes, IvtHttpErrorResponse } from '@ivt/c-data';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, switchMap, take } from 'rxjs/operators';

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
    return this.authService.getToken().pipe(
      take(1),
      switchMap(token => {
        this.loadingService.show(request.method);
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            if (!request.headers.get('noMessage')) {
              this.handleError(error.error);
            }
            return throwError(error);
          }),
          finalize(() => this.loadingService.hide(request.method))
        );
      })
    );
  }

  handleError(error: IvtHttpErrorResponse): void {
    error.statusCode === HttpStatusCodes.Unauthorized
      ? this.store.dispatch(fromAuth.actions.logout())
      : this.messageService.error(`${error.message}`);
  }
}
