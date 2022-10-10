import { DynamicModule, Inject, Module, OnModuleInit } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ANGULAR_UNIVERSAL_OPTIONS } from '@nestjs/ng-universal/dist/angular-universal.constants';
import { existsSync } from 'fs';
import { join } from 'path';

import { AngularUniversalOptions } from './angular-universal-options.interface';
import { angularUniversalProviders } from './angular-universsal.providers';
import { loadEsmModule } from './load-esm-module';

@Module({
  providers: [...angularUniversalProviders],
})
export class AngularUniversalModule implements OnModuleInit {
  static forRoot(configFactory: () => AngularUniversalOptions | Promise<AngularUniversalOptions>): DynamicModule {
    const factory = async (): Promise<AngularUniversalOptions> => {
      const options = await configFactory();

      const indexHtml = existsSync(join(options.viewsPath, 'index.original.html')) ? 'index.original.html' : 'index';

      return {
        templatePath: indexHtml,
        rootStaticPath: '*.*',
        renderPath: '*',
        ...options,
      };
    };

    return {
      module: AngularUniversalModule,
      providers: [
        {
          provide: ANGULAR_UNIVERSAL_OPTIONS,
          useFactory: factory,
        },
      ],
    };
  }

  constructor(
    @Inject(ANGULAR_UNIVERSAL_OPTIONS)
    private readonly ngOptions: AngularUniversalOptions,
    private readonly httpAdapterHost: HttpAdapterHost
  ) {}

  async onModuleInit() {
    const { APP_BASE_HREF } = await loadEsmModule<typeof import('@angular/common')>('@angular/common');

    if (!this.httpAdapterHost) {
      return;
    }

    const httpAdapter = this.httpAdapterHost.httpAdapter;
    if (!httpAdapter) {
      return;
    }

    const app = httpAdapter.getInstance();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    app.get(this.ngOptions.renderPath, (req: any, res: any) =>
      res.render(this.ngOptions.templatePath, {
        req,
        res,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
      })
    );
  }
}
