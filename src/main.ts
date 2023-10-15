import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import '@angular/common/locales/es';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
