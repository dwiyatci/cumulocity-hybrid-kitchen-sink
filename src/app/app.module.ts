import { NgModule } from '@angular/core';
import { UpgradeModule as NgUpgradeModule } from '@angular/upgrade/static';
import { AssetsNavigatorModule } from '@c8y/ngx-components/assets-navigator';
import { HybridAppModule, UpgradeModule } from '@c8y/ngx-components/upgrade';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HelloWidgetModule } from './hello-widget/hello-widget.module';
import { SharedModule } from './shared/shared.module';
import { SinkModule } from './sink/sink.module';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    AssetsNavigatorModule,
    HelloWidgetModule,
    SinkModule,
    AppRoutingModule,
    NgUpgradeModule,
    // Upgrade module must be the last
    UpgradeModule
  ]
})
export class AppModule extends HybridAppModule {
  constructor(protected upgrade: NgUpgradeModule) {
    super();
  }
}
