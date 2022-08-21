import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
//added for share function
import { defineCustomElements } from '@ionic/pwa-elements/loader';

if (environment.firebase) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
  //added for share function
  // Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
