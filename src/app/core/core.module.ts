import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CoreModule as C8YCoreModule,
  HOOK_ACTION,
  HOOK_ACTION_BAR,
  HOOK_BREADCRUMB,
  HOOK_COMPONENT,
  HOOK_NAVIGATOR_NODES,
  HOOK_TABS
} from '@c8y/ngx-components';

import { helloWidgetDefinition } from '../hello-widget/hello-widget.definition';
import { LazyNavigationNodesFactory } from '../lazy/lazy-navigation-nodes.factory';
import { SinkNavigationNodesFactory } from '../sink/sink-navigation-nodes.factory';
import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  imports: [BrowserAnimationsModule, C8YCoreModule.forRoot()],
  exports: [BrowserAnimationsModule],
  providers: [
    { provide: HOOK_NAVIGATOR_NODES, useClass: SinkNavigationNodesFactory, multi: true },
    { provide: HOOK_NAVIGATOR_NODES, useClass: LazyNavigationNodesFactory, multi: true },
    { provide: HOOK_COMPONENT, useValue: helloWidgetDefinition, multi: true }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
