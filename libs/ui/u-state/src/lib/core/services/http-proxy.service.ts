import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IVT_UI_STATE_CONFIGURATION, IvtUiStateConfiguration } from '../../ui-state-config';

@Injectable({
  providedIn: 'root',
})
export class HttpProxyService implements HttpInterceptor {
  constructor(@Inject(IVT_UI_STATE_CONFIGURATION) public config: IvtUiStateConfiguration) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.includes('/ivtApi')) {
      const apiRequest = req.clone({
        url: req.url.replace('/ivtApi', this.config.apiUrl),
      });
      return next.handle(apiRequest);
    } else {
      return next.handle(req);
    }
  }
}
