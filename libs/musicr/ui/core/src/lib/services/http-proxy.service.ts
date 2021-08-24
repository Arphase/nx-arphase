import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MUSIC_REVOLUTION_CONFIGURATION, MusicRevolutionConfiguration } from '../config';

@Injectable({
  providedIn: 'root',
})
export class HttpProxyService implements HttpInterceptor {
  constructor(@Inject(MUSIC_REVOLUTION_CONFIGURATION) public config: MusicRevolutionConfiguration) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.includes('/mrlApi')) {
      const apiRequest = req.clone({ url: req.url.replace('/mrlApi', this.config.apiUrl) });
      return next.handle(apiRequest);
    } else {
      return next.handle(req);
    }
  }
}
