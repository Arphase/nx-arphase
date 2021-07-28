import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { VALMIRA_CONFIGURATION, ValmiraConfiguration } from '../config';

@Injectable({
  providedIn: 'root',
})
export class HttpProxyService implements HttpInterceptor {
  constructor(@Inject(VALMIRA_CONFIGURATION) public config: ValmiraConfiguration) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.includes('/vmaApi')) {
      const apiRequest = req.clone({ url: req.url.replace('/vmaApi', this.config.apiUrl) });
      return next.handle(apiRequest);
    } else {
      return next.handle(req);
    }
  }
}
