import { AngularUniversalOptions as BaseOptions } from '@nestjs/ng-universal/dist/interfaces/angular-universal-options.interface';
import { ngExpressEngine } from '@nguniversal/express-engine';

export interface AngularUniversalOptions extends BaseOptions {
  ngExpressEngine: typeof ngExpressEngine;
}
