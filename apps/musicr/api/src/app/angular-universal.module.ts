// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppServerModule } from '@musicr/store/app.server.module';
import { AngularUniversalModule } from '@qupaya/nestjs-ng-universal';
import { join } from 'path';

export const UniversalModule = AngularUniversalModule.forRoot({
  bootstrap: AppServerModule,
  viewsPath: join(process.cwd(), 'dist/apps/musicr/browser'),
});
