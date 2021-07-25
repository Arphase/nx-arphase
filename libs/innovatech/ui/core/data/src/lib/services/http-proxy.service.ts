import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { INNOVATECH_CONFIGURATION, InnovatechConfiguration } from '../config';

@Injectable({
  providedIn: 'root',
})
export class HttpProxyService implements HttpInterceptor {
  constructor(@Inject(INNOVATECH_CONFIGURATION) public config: InnovatechConfiguration) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.includes('/ivtApi')) {
      const apiRequest = req.clone({ url: req.url.replace('/ivtApi', this.config.apiUrl) });
      return next.handle(apiRequest);
    } else {
      return next.handle(req);
    }
  }
}
